/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { GetRoomMessages } from "@modules/http/Admin/useCases/GetRoomMessages/GetRoomMessages";
import { GetRoomMessagesController } from "@modules/http/Admin/useCases/GetRoomMessages/GetRoomMessagesController";

export function makeGetRoomMessages(): Controller {
  const useCase = new GetRoomMessages();
  const controller = new GetRoomMessagesController(useCase);

  return controller;
}
