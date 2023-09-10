/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { HttpResponse, fail, notFound, ok } from "@core/logic/HttpResponse";
import { GetRoomMessages } from "./GetRoomMessages";
import e from "cors";

type GetRoomMessagesControllerRequest = {
  roomId: string;
};

export class GetRoomMessagesController implements Controller {
  constructor(private getRoomMessages: GetRoomMessages) {}

  async handle({
    roomId,
  }: GetRoomMessagesControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getRoomMessages.execute({ roomId });

      if (result.isLeft()) {
        return notFound(result.value);
      } else {
        return ok(result.value);
      }
    } catch (error) {
      return fail(error);
    }
  }
}
