import {prisma} from "../db/client";
import { Prisma } from '@prisma/client';

const findSpecificUserById = (id: string) => {
    return Prisma.validator<Prisma.UserWhereInput>()({
        id
    });
};

class UserService {

    public async getUserById(id:string, userSelect: Prisma.UserSelect) {

        const myUserSelect : Prisma.UserSelect  ={
            budgetAccounts: true
        }
        const results = await prisma.user.findUnique({
            where: findSpecificUserById(id),
            select: {budgetAccounts: true}
        });

        return results
    }

}

export const userService = new UserService();