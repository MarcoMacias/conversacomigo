/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { BanUser } from "./BanUser";
import { clientError, fail, ok } from "@core/logic/HttpResponse";

type BanUserControllerRequest = {
  userId: string;
};

export class BanUserController implements Controller {
  constructor(private banUser: BanUser) {}

  async handle({ userId }: BanUserControllerRequest) {
    try {
      const result = await this.banUser.execute({ userId });

      if (result.isLeft()) {
        return clientError(result.value);
      } else {
        return ok(result.value);
      }
    } catch (error) {
      return fail(error.message);
    }
  }
}
