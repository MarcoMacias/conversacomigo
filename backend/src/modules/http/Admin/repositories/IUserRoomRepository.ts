/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
export interface IUserRoomRepository {
  existsBan(ip: string): Promise<boolean>;
  banUser(ip: string): Promise<boolean>;
}
