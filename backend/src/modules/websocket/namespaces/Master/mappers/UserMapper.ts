import { UserDTO } from "@core/dtos/WebSocket";
import { User } from "../entities/User";

export class UserMapper {
  static toDomain (raw: UserDTO): User {
    const user = User.create({
      gender: raw.gender,
      id: raw.id,
      uf: raw.uf,
    })

    return user;
  }

  static toPersistence (user: User): UserDTO {
    return  {
      id: user.id,
      uf: user.uf,
      gender: user.gender,  
      room: user.room
    }
  }
}