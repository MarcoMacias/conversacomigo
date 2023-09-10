/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { User } from "@modules/websocket/namespaces/Master/entities/User";

export type UserDTO = {
  uf: string;
  id: string;
  gender: string;
  room?: string;
  searching: boolean;
};

export type HandshakeDTO = {
  uf: string;
  gender: string;
};

export type RoomDTO = {
  id: string;
  users: User[];
  messages?: RoomMessages[];
  pass?: string;
};

export type RoomMessages = {
  user: string;
  message: string;
  date: Date;
};
