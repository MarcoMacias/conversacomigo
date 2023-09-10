/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { UserDTO } from "@core/dtos/WebSocket";
import { User } from "../entities/User";

export class UserMapper {
  static toDomain(raw: UserDTO): User {
    const user = User.create({
      gender: raw.gender,
      id: raw.id,
      uf: raw.uf,
      searching: raw.searching,
    });

    return user;
  }

  static toPersistence(user: User): UserDTO {
    return {
      id: user.id,
      uf: user.uf,
      gender: user.gender,
      room: user.room,
      searching: user.searching,
    };
  }
}
