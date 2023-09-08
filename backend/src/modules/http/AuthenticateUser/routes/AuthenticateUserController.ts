import { Controller } from "@core/logic/Controller";
import { AuthenticateUser } from "./AuthenticateUser";
import { HttpResponse, fail, ok, unauthorized } from "@core/logic/HttpResponse";
import { InvalidPassword } from "./errors/InvalidPassword";

type AuthenticateUserRequest = {
  authorization: string;
}


export class AuthenticateUserController implements Controller {
  constructor (private authenticateUser: AuthenticateUser) {}
  
 async handle({
  authorization
 }: AuthenticateUserRequest): Promise<HttpResponse> {
  try {
    const result = await this.authenticateUser.execute({
      buffer: authorization
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidPassword:
          return unauthorized(error)
        default:
          return fail(error )
      } 
    } else {
      const { token } = result.value;


      return ok({
        token
      })
    }
  } catch (error) {
    return fail(error);
  }
 } 
}