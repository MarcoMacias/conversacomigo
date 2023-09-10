/*****************************************************************************
 *
 *  PROJECT:     Conversa Comigo
 *  LICENSE:     See LICENSE in the top level directory
 *  AUTHOR:      Vítor Ribeiro (flashii) Powered by: https://varsel.com.br
 *
 *****************************************************************************/
import { prisma } from "@infra/prisma/connector";
import { IUserRoomRepository } from "../IUserRoomRepository";

export class PrismaUserRoomRepository implements IUserRoomRepository {
  async existsBan(ip: string): Promise<boolean> {
    const dbQuery = await prisma.bans.findUnique({
      where: {
        ip: ip,
      },
    });

    return !!dbQuery;
  }

  async banUser(ip: string): Promise<boolean> {
    await prisma.bans.create({
      data: {
        ip: ip,
      },
    });

    return true;
  }
}
