/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { HttpResponse } from "./HttpResponse";

export interface Middleware<T = any, U = any> {
  handle: (httpRequest: T, httpBody?: U) => Promise<HttpResponse | false>;
}
