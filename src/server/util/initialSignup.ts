import {prisma} from "../db/client";
import {getCurrentMonthlyBudgetString} from "../common/monthlyBudgetDate";

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

export default initialSignup