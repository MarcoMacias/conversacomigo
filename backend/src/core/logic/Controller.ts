/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { HttpResponse } from "./HttpResponse";

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
