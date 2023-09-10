/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { HttpResponse, ok } from "@core/logic/HttpResponse";
import { GetActiveRooms } from "./GetActiveRooms";

export class GetActiveRoomsController implements Controller {
  constructor(private getActiveRooms: GetActiveRooms) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.getActiveRooms.execute();
    return ok(result);
  }
}
