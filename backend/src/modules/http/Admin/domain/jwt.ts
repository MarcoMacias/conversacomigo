/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { sign, verify } from "jsonwebtoken";

import { Either, left, right } from "@core/logic/Either";

import { InvalidJsonWebToken } from "./errors/InvalidJsonWebToken";

interface JWTData {
  id: string;
  token: string;
}

export interface JWTTokenPayload {
  exp: number;
  sub: JWTData;
}

export class JWT {
  public readonly id: string;
  public readonly token: string;

  private constructor({ id, token }: JWTData) {
    this.id = id;
    this.token = token;
  }

  static decodeToken(
    token: string
  ): Either<InvalidJsonWebToken, JWTTokenPayload> {
    try {
      const decoded = (verify(
        token,
        process.env.JWT_SECRET
      ) as unknown) as JWTTokenPayload;

      return right(decoded);
    } catch (err) {
      return left(new InvalidJsonWebToken());
    }
  }

  static createFromJWT(token: string): Either<InvalidJsonWebToken, JWT> {
    const jwtPayloadOrError = this.decodeToken(token);

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value);
    }

    const jwt = new JWT({
      token,
      id: jwtPayloadOrError.value.sub.id,
    });

    return right(jwt);
  }

  static signUser(id: string): JWT {
    const token = sign({ id: id }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: "1d",
    });

    const jwt = new JWT({ id, token });

    return jwt;
  }
}
