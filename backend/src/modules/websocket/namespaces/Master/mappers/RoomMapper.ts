/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { RoomDTO } from "@core/dtos/WebSocket";
import { Room } from "../entities/Room";

export class RoomMapper {
  static toDomain(raw: RoomDTO): Room {
    const room = Room.create({
      users: raw.users,
      messages: raw.messages,
    });

    return room;
  }

  static toPersistence(room: Room): RoomDTO {
    return {
      id: room.id,
      users: room.users,
      messages: room.messages,
    };
  }
}
