import {router, protectedProcedure} from "../trpc";
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
  .input(z.object({ month: z.string().optional() }).nullish())
  .query(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetMonthService.getCurrent(userSession.currentBudgetAccount, input?.month);
  }),
  getBudgetMonthOptions: protectedProcedure
  .query(async() => {
    return await budgetMonthService.getBudgetMonthOptions();
  })
});
