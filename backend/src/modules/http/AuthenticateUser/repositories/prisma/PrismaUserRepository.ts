import { prisma } from "@infra/prisma/connector";
import { IUserRepository } from "../IUserRepository";

export class PrismaUserRepository  implements IUserRepository {
  save(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async exists(email: string): Promise<boolean> {
    const dbQuery = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return !!dbQuery;
  }
  
  async findOne(email: string): Promise<Object> {
    const dbQuery = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return dbQuery;
  }  
}