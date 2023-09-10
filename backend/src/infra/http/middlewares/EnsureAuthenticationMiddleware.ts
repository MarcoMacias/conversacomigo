/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { JWT } from "@modules/http/Admin/domain/jwt";

import {
  fail,
  forbidden,
  HttpResponse,
  ok,
  unauthorized,
} from "@core/logic/HttpResponse";
import { Middleware } from "@core/logic/Middleware";

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}

  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken && accessToken.length > 1000) {
        return unauthorized(new Error("unauthorized"));
      }

      if (accessToken) {
        try {
          const decoded = JWT.decodeToken(accessToken);
          const user = decoded.value;

          if (decoded.isLeft()) {
            return unauthorized(new Error("unauthorized"));
          }

          return ok({ user: user });
        } catch (err) {
          return unauthorized(new Error("unauthorized"));
        }
      } else {
        return unauthorized(new Error("unauthorized"));
      }
    } catch (error) {
      return fail(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
