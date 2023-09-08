import { User } from "@modules/websocket/namespaces/Master/entities/User";

export type UserDTO = {
  uf: string;
  id: string;
  gender: string;
  room?: string;
}

export type HandshakeDTO = {
  uf: string;
  gender: string;
}

export type RoomDTO  = {
  users: User[];
  messages?: RoomMessages[];
  pass?: string;
}

export type RoomMessages = {
  user: string;
  message: string;
  date: Date;
}