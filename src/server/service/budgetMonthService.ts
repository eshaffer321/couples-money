import {userService} from "./userService";
import {prisma} from "../db/client";


class BudgetMonthService {
    // get the last budget month the user was looking at
    public async getCurrent (id: string) {
        const user = await userService.getUserById(id);
        if (!user) {
            return {error: "User not found"}
        }

        //
        if (!user.currentMonthlyBudgetId) {
            const newBudgetMonth = await prisma.monthlyBudget.create({
                data: {}
            });
        }
    }

    public async create() {
        return await prisma.monthlyBudget.create({
            data: {}
        })
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