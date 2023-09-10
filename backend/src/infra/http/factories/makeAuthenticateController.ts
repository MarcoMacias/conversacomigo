/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Controller } from "@core/logic/Controller";
import { PrismaUserRepository } from "@modules/http/Admin/repositories/prisma/PrismaUserRepository";
import { AuthenticateUser } from "@modules/http/Admin/useCases/AuthenticateUser/AuthenticateUser";
import { AuthenticateUserController } from "@modules/http/Admin/useCases/AuthenticateUser/AuthenticateUserController";

export function makeAuthenticateController(): Controller {
  const repository = new PrismaUserRepository();
  const useCase = new AuthenticateUser(repository);
  const controller = new AuthenticateUserController(useCase);

  return controller;
}
