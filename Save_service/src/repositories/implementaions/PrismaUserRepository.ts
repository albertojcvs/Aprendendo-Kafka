import { PrismaClient } from ".prisma/client";
import { IUsersRepository } from "../IUsersReposotory";

const prisma = new PrismaClient();
export class PrismaUserRepository implements IUsersRepository {
  async store(user: User) {
    await prisma.user.create({ data: user });
  }

  async destroy(id: number) {
    await prisma.user.deleteMany({where:{id}});
  }

  async find(id:number){
   const user =  await prisma.user.findFirst({where:{id},rejectOnNotFound:true})
    return user;
  }
}
