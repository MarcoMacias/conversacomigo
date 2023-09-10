/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { PrismaUserRoomRepository } from "@modules/http/Admin/repositories/prisma/PrismaUserRoomRepository";
import { BanUser } from "@modules/http/Admin/useCases/BanUser/BanUser";
import { BanUserController } from "@modules/http/Admin/useCases/BanUser/BanUserController";

export function makeBanUserController(): Controller {
  const repository = new PrismaUserRoomRepository();
  const useCase = new BanUser(repository);
  const controller = new BanUserController(useCase);

  return controller;
}
