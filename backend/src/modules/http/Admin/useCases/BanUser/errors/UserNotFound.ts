/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { DomainError } from "@core/logic/domain/DomainError";

export class UserNotFound extends Error implements DomainError {
  constructor() {
    super(`USER NOT FOUND`);
    this.name = "UserNotFound";
  }
}
