/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { GetActiveRooms } from "@modules/http/Admin/useCases/GetActiveRooms/GetActiveRooms";
import { GetActiveRoomsController } from "@modules/http/Admin/useCases/GetActiveRooms/GetActiveRoomsController";

export function makeGetActiveRoomsController(): Controller {
  const useCase = new GetActiveRooms();
  const controller = new GetActiveRoomsController(useCase);

  return controller;
}
