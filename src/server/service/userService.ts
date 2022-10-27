import {prisma} from "../db/client";
import { Prisma } from '@prisma/client'
class UserService {

    public async getUserById(id:string, includes?:any) {
        console.log(includes);
        const test = Prisma.Prisma__AccountClient
        return await prisma.user.findUnique({
            where: {
                id: id
            },
        });
    }
}

export const userService = new UserService();