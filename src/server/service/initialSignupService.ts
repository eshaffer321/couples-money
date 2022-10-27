import {prisma} from "../db/client";
import {getCurrentMonthlyBudgetString} from "../common/monthlyBudgetDate";
import {userService} from "./userService";
import {budgetMonthService} from "./budgetMonthService";

class InitialSignupService {
    public async signUpUserIfRequired(userId: string, currentMonthlyBudget: number) {
        const user = await userService.getUserById(userId, {budgetAccounts: true});

        if (!user) {
            return {error: "User not found"};
        }

        if(user.budgetAccounts.length != 0) {

        }


    }

}
const isInitialSignupComplete = async(userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            budgetAccounts: true
        }
    });

    return {signUpComplete: user?.budgetAccounts.length != 0, user: user}
}

const initialSignup = async(userId: string) => {
    console.log("userid from initial setup: {}", userId);

    const {signUpComplete, user} = await isInitialSignupComplete(userId);

    if (!signUpComplete) {
        console.log("Running initial signup steps")
        await prisma.$transaction(async(tx) => {
            // create new budget group
            const newBudgetAccount = await prisma.budgetAccount.create({
                data: {}
            });

            // connect new budget group to user
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    budgetAccounts: {
                        connect: {
                            id: newBudgetAccount.id
                        }
                    }
                }
            });

            // create new monthly budget and connect to new budget account
            const newMonthlyBudget =await prisma.monthlyBudget.create({
                data: {
                    firstDayOfMonth: getCurrentMonthlyBudgetString(),
                    budgetAccount: {
                        connect: {
                            id: newBudgetAccount.id
                        }
                    }
                }
            });

            // set the new current monthly budget to the user
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    currentMonthlyBudgetId: newMonthlyBudget.id
                }
            })
        });

    } else {
        console.debug("Not running initial signup");
    }

    console.log(user);
}
export const initialSignupService = new InitialSignupService();
export default initialSignup