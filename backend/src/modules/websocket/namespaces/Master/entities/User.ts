/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Entity } from "@core/logic/Entity";
import { Socket } from "socket.io";
import logsole from "src/vendor/logsole";

interface IUserProps {
  uf: string;
  id: string;
  gender: string;
  room?: string;
  lastChatter?: string;
  searching: boolean;
  socket?: Socket;
}

export class User extends Entity<IUserProps> {
  get uf(): string {
    return this.props.uf;
  }
  get id(): string {
    return this.props.id;
  }
  get gender(): string {
    return this.props.gender;
  }
  get room(): string {
    return this.props.room;
  }
  get socket(): Socket {
    return this.props.socket;
  }
  get lastChatter(): string {
    return this.props.lastChatter;
  }
  get searching(): boolean {
    return this.props.searching;
  }

  set setUserUF(value: string) {
    this.props.uf = value;
  }
  set setUserGender(value: string) {
    this.props.gender = value;
  }
  set setUserSocket(value: Socket) {
    this.props.socket = value;
  }
  set setLastChatter(value: string) {
    this.props.lastChatter = value;
  }
  set setSearching(value: boolean) {
    this.props.searching = value;
  }

  public leaveRoom(): void {
    logsole.debug(this.props.id + " leaving room: " + this.props.room);
    this.socket.leave(this.room);
    this.props.room = null;
  }

  public setUserRoom(value: string) {
    if (this.props.socket) {
      this.props.room = value;
      this.props.socket.join(value);
      this.props.searching = false;

      logsole.debug("User: " + this.props.id + " joined at room: " + value);
    }
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  static create(props: IUserProps, id?: string): User {
    const room = new User(
      {
        ...props,
      },
      id
    );
    return room;
  }
}
