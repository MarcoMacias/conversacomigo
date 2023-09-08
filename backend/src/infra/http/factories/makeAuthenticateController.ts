import { Controller } from "@core/logic/Controller"
import { PrismaUserRepository } from "@modules/http/AuthenticateUser/repositories/prisma/PrismaUserRepository"
import { AuthenticateUser } from "@modules/http/AuthenticateUser/routes/AuthenticateUser"
import { AuthenticateUserController } from "@modules/http/AuthenticateUser/routes/AuthenticateUserController"

export function makeActivateUserController(): Controller {
  const repository = new PrismaUserRepository()
  const useCase = new AuthenticateUser(repository)
  const controller = new AuthenticateUserController(useCase)

  return controller
}