/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
export interface IUserRepository {
  exists(email: string): Promise<boolean>;
  findOne(email: string): Promise<any>;
}
