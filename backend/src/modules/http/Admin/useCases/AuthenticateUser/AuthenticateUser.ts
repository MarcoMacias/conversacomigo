/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Either, left, right } from "@core/logic/Either";
import { InvalidPassword } from "./errors/InvalidPassword";
import { IUserRepository } from "@modules/http/Admin/repositories/IUserRepository";
import { JWT } from "@modules/http/Admin/domain/jwt";

type TokenResponse = {
  token: string;
};

type AuthenticateUserRequest = {
  buffer: string;
};

type AuthenticateUserResponse = Either<InvalidPassword, TokenResponse>;

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    buffer,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const [, hash] = buffer.split(" ");
    const [email, password] = Buffer.from(hash, "base64").toString().split(":");
    const account = await this.usersRepository.findOne(email);

    if (!account) {
      return left(new Error("Account does not exist"));
    }

    const isValidPassword = account.password === password ? true : false;

    if (!isValidPassword) {
      return left(new InvalidPassword());
    }

    const { token } = JWT.signUser(account.id);

    return right({
      token,
    });
  }
}
