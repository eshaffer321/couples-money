import {userService} from "./userService";
import {prisma} from "../db/client";
import { Prisma } from '@prisma/client';


class BudgetMonthService {
    // get the last budget month the user was looking at
    public async getCurrent (id: string) {
        // const userSelect : Prisma.UserSelect = {budgetAccounts: true, currentMonthlyBudgetId: true}
        // const user = await userService.getUserById(id, userSelect);
        //
        // if (!user) { return {error: "User not found"} }
        //
        // user.budgetAccounts
        //
        // if ( user.budgetAccounts.length === 0 )

        // const budgetMonths

        //
        // if (!user.currentMonthlyBudgetId) {
        //     const newBudgetMonth = await prisma.monthlyBudget.create({
        //         data: {}
        //     });
        // }

        // console.log(user)
    }


    public async create() {
        // return await prisma.monthlyBudget.create({
        //     data: {}
        // })
    }
}

const getCurrentMonthlyBudgetString = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString();
    return firstDay.replaceAll("/", "")
};

const getLastDayOfCurrentMonth = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString();
    return lastDay.replaceAll("/", "")
};

export {getCurrentMonthlyBudgetString, getLastDayOfCurrentMonth};
export const budgetMonthService = new BudgetMonthService();