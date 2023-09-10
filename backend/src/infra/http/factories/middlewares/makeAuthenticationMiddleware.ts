/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { Middleware } from "@core/logic/Middleware";
import { EnsureAuthenticatedMiddleware } from "@infra/http/middlewares/EnsureAuthenticationMiddleware";

export function makeAuthenticationMiddleware(): Middleware {
  const middleware = new EnsureAuthenticatedMiddleware();
  return middleware;
}
