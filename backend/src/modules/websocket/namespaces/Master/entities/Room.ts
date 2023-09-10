/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { RoomMessages, UserDTO } from "@core/dtos/WebSocket";
import { Entity } from "@core/logic/Entity";
import { User } from "@modules/websocket/namespaces/Master/entities/User";
import logsole from "src/vendor/logsole";

interface IRoomProps {
  users: User[];
  messages?: RoomMessages[];
  pass?: string;
}

export class Room extends Entity<IRoomProps> {
  get users() {
    return this.props.users;
  }
  get messages(): RoomMessages[] {
    return this.props.messages;
  }
  set setRoomPassword(pass: string) {
    this.props.pass = pass;
  }

  public addMessage(userId: string, message: string): RoomMessages {
    const newMessage = {
      date: new Date(),
      message: message,
      user: userId,
    };

    this.props.messages.push(newMessage);

    return newMessage;
  }

  public pushUser(user: User): void {
    this.props.users.push(user);
  }

  public removeUser(id: string): void {
    const index = this.props.users.findIndex(
      (user: { id: string }) => user.id === id
    );

    if (index !== -1) {
      this.props.users.splice(index, 1);
    }
  }

  private constructor(props: IRoomProps, id?: string) {
    super(props, id);
  }

  static create(props: IRoomProps, id?: string): Room {
    const room = new Room(
      {
        ...props,
        messages: [],
      },
      id
    );

    logsole.success("Room created: " + room.id);
    return room;
  }
}
