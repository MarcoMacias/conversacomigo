/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Either, left, right } from "@core/logic/Either";
import { IUserRoomRepository } from "../../repositories/IUserRoomRepository";
import { UserNotFound } from "./errors/UserNotFound";
import worker from "src/main";

type BanUserRequest = {
  userId: string;
};

type BanUserResponse = Either<UserNotFound, boolean>;

export class BanUser {
  constructor(private banRepository: IUserRoomRepository) {}

  async execute({ userId }: BanUserRequest): Promise<BanUserResponse> {
    const ban = worker.namespace.onBanAction(userId);

    if (ban) {
      const exists = await this.banRepository.existsBan(ban);

      if (!exists) {
        const save = await this.banRepository.banUser(ban);

        if (save) {
          return right(true);
        } else {
          return right(false);
        }
      } else {
        return right(true);
      }
    } else {
      return left(new UserNotFound());
    }
  }
}
