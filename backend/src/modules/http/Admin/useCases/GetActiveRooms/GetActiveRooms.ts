/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { RoomDTO, UserDTO } from "@core/dtos/WebSocket";
import { UserMapper } from "@modules/websocket/namespaces/Master/mappers/UserMapper";
import worker from "src/main";

type IntrospectRoom = {
  id: string;
  Users: UserDTO[];
};

type ActiveRooms = {
  Rooms: IntrospectRoom[];
};

type GetActiveRoomsResponse = ActiveRooms;

export class GetActiveRooms {
  constructor() {}

  async execute(): Promise<GetActiveRoomsResponse> {
    const rooms = worker.namespace.rooms;

    const instrospect = rooms.map((room: RoomDTO) => {
      return {
        id: room.id,
        Users: room.users.map((user) => UserMapper.toPersistence(user)),
      };
    });
    return {
      Rooms: instrospect,
    };
  }
}
