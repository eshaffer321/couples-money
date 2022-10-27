import {router, protectedProcedure, publicProcedure} from "../trpc";
import { z } from "zod";
import {budgetMonthService} from "../../service/budgetMonthService";
import {userService} from "../../service/userService";

export const budgetMonthRouter = router({
    create: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await budgetMonthService.create();
        }),
    getCurrent: protectedProcedure
        .input(z.object({id: z.number()}))
        .query(async ({ input, ctx }) => {
            const userSession = ctx.session.user;
            return await budgetMonthService.getCurrent(userSession.id)

            // if (!user.currentMonthlyBudgetId) {
            //     const monthlyBudget = ctx.prisma.monthlyBudget.create({
            //
            //     });
            // }

            return ctx.prisma.monthlyBudget.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    budgetGroup: true
                }
            })
    }),
});
