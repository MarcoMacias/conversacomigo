/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import * as DTOS from "@core/dtos/WebSocket";
import { Namespace, Server, Socket } from "socket.io";
import logsole from "src/vendor/logsole";
import { Room } from "@modules/websocket/namespaces/Master/entities/Room";
import { v4 } from "uuid";
import { User } from "@modules/websocket/namespaces/Master/entities/User";
import { UserMapper } from "./mappers/UserMapper";
import { prisma } from "@infra/prisma/connector";

export default class Master {
  io: Namespace;
  namespace: string = "/master";
  users: User[] = [];
  rooms: Room[] = [];
  retries = 0;

  constructor(io: Server) {
    this.io = io.of(this.namespace);

    this.io.on("connection", (socket) => {
      socket.on("onClientSearch", async (data, cb) => {
        if (typeof cb !== "function") {
          return;
        }

        const checkBan = await prisma.bans.findFirst({
          where: { ip: socket.conn.remoteAddress },
        });

        if (checkBan) {
          return cb(true);
        } else {
          this.signIn(socket, data);

          return cb(false);
        }
      });

      socket.on("onClientSendMessage", (message: string) => {
        this.onMessage(socket.id, message);
      });

      socket.on("disconnect", (reason: string) => {
        this.signOut(socket.id, reason);
      });
    });

    setInterval(
      () => this.masterHeartbeat(),
      Number(process.env.TIME_TO_SEARCH)
    );
  }

  /* 
    @signIn is used to register a new user on master namespace and master namespace is used to manager users
    and channels.
  */
  private signIn(socket: Socket, data: DTOS.HandshakeDTO) {
    const exists = this.users.some((user) => user.id === socket.id);

    if (exists) {
      const user = this.users.find((user) => user.id === socket.id);

      user.setUserUF = data.uf;
      user.setUserGender = data.gender;

      if (user.room) {
        this.requestCloseRoom(user.room);
      }

      user.setSearching = true;
    } else {
      const user = User.create(
        {
          id: socket.id,
          uf: data.uf,
          searching: true,
          gender: data.gender,
          socket: socket,
        },
        socket.id
      );

      this.users.push(user);
    }

    logsole.debug("A new user has signed up " + socket.id);
  }

  /* 
    @signOut like above is used to manage on user has disconnected from the server. 
    Nothing else is so simple. :p
  */
  private signOut(id: string, reason: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index !== -1) {
      const user = this.users[index];

      if (user.room) {
        this.requestCloseRoom(user.room);
      }

      this.users.splice(index, 1);
      logsole.info("User " + id + " has signed out, reason: " + reason);
    } else {
      logsole.error("User " + id + " had problems signing out");
    }
  }

  /*
    @masterHeartbeat is a loop to make new users match line every process.env.TIME_TO_SEARCHms.
  */
  private masterHeartbeat() {
    const host = this.users.find((user) => user.searching === true);

    if (host && this.retries >= 3) {
      const visitor = this.users.find(
        (user) => user.id !== host.id && user.searching === true
      );

      if (visitor) {
        this.requestCreateRoom([host, visitor]);
        logsole.warning(
          "Servers is so busy, using high priority flag to create a room"
        );
      } else {
        this.retries = 0;
      }
    } else if (host && this.retries < 3) {
      const visitor = this.users.find(
        (user) =>
          user.id !== host.id &&
          user.searching &&
          user.uf === host.uf &&
          user.gender === host.gender &&
          user.id !== host.lastChatter &&
          host.id !== user.lastChatter
      );

      if (visitor) {
        this.requestCreateRoom([host, visitor]);
        logsole.info("Normal room");
      } else {
        this.retries += 1;
        logsole.info("Servers is busy, Retrying: " + this.retries);
      }
    }

    return true;
  }

  /* 
    @requestCreateRoom is the best way to create a room with socket.io without large code. This function is called when two users has matched
  */
  private requestCreateRoom(users: User[]) {
    const room = Room.create(
      {
        users: users,
      },
      v4()
    );

    // Preventing the same users from meeting each other in the future.
    users.map((user) => {
      user.setUserRoom(room.id);
      user.setSearching = false;
    });

    this.rooms.push(room);
    this.io.to(room.id).emit(
      "onServerNotifyCreate",
      room.users.map((user) => UserMapper.toPersistence(user))
    );

    return true;
  }

  /*
    @requestClosRoom like above this function is called when user god banned, disconnect or start new searching.
  */
  private requestCloseRoom(id: string) {
    const room = this.rooms.find((room) => room.id === id);

    if (room) {
      this.io.to(room.id).emit("onServerRoomClose");

      room.users.map((user) => {
        user.leaveRoom();

        const lastChatter = room.users.find((u) => u.id !== user.id).id;
        user.setLastChatter = lastChatter;
      });

      const index = this.rooms.indexOf(room);
      this.rooms.splice(index, 1);

      logsole.debug("Room " + id + " is closed");
    } else {
      logsole.error("Problems deleting room id: " + id);
    }
  }

  /*
    @onMessage Nothing more, this function is called when user send a new message on some room.
  */
  private onMessage(userId: string, message: string) {
    const room = this.rooms.find(
      (room) => room.users[0].id == userId || room.users[1].id == userId
    );

    if (room) {
      const messageOrErr = room.addMessage(userId, message);

      if (messageOrErr) {
        this.io.to(room.id).emit("onRoomReceiveMessage", messageOrErr);
      }
    }
  }

  /*
    @onBanAction This function is called in extern module. is called by a superuser to ban a user.
  */
  public onBanAction(userId: string) {
    const user = this.users.find((user) => user.id == userId);

    if (user) {
      if (user.room) {
        this.requestCloseRoom(user.room);
      }

      user.socket.emit("onUserGotBanned", true);

      const ip = user.socket.conn.remoteAddress;

      this.users.splice(
        1,
        this.users.findIndex((user) => user.id === userId)
      );

      return ip;
    } else {
      return false;
    }
  }
}
