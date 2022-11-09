import {prisma} from "../db/client"
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;

class BudgetAccountService {
    public async getBudgetAccountIdByUserId(userId: string) {

        const user = await prisma.user.findUnique({
            where: {id : userId},
            select: {currentBudgetAccountID: true, budgetAccounts: true}
        });

        console.log(user)

        if (user?.currentBudgetAccountID) {
            console.debug("Returning current Budget Account found in user row")
            return user?.currentBudgetAccountID
        }

        if (user?.budgetAccounts.length === 0) {
            console.debug("Creating a new budget account because one wasn't found for user {}", userId)
            const newBudgetAccount = await prisma.budgetAccount.create({
                data: {
                    userId: userId
                }
            })

            await prisma.user.update({
                where: { id: userId},
                data: {
                    currentBudgetAccountID: newBudgetAccount.id
                }
            })

            return newBudgetAccount.id
        }
    }
}

export const budgetAccountService = new BudgetAccountService();