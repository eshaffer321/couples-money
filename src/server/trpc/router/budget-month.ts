import {router, protectedProcedure} from "../trpc";
import { z } from "zod";
import {budgetMonthService} from "../../service/budgetMonthService";

export const budgetMonthRouter = router({
  create: protectedProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ input, ctx }) => {
    return await budgetMonthService.create();
  }),
  getBudgetMonth: protectedProcedure
  .input(z.object({ month: z.string().optional() }).nullish())
  .query(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetMonthService.getBudgetMonth(userSession.currentBudgetAccount, input?.month);
  }),
  getBudgetMonthOptions: protectedProcedure
  .query(async() => {
    return await budgetMonthService.getBudgetMonthOptions();
  })
});
