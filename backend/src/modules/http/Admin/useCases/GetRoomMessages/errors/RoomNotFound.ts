/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { DomainError } from "@core/logic/domain/DomainError";

export class RoomNotFound extends Error implements DomainError {
  constructor() {
    super(`ROOM NOT FOUND`);
    this.name = "RoomNotFound";
  }
}
