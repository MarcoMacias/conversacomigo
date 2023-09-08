import { RoomDTO } from "@core/dtos/WebSocket";
import { Room } from "../entities/Room";

export class RoomMapper {
  static toDomain (raw: RoomDTO): Room {
    const room  = Room.create({
      users: raw.users,
      messages: raw.messages, 
    });

    return room;
  }


  static toPersistence (room: Room): RoomDTO {
    return {
      users: room.users,
      messages: room.messages,
    }
  }
}