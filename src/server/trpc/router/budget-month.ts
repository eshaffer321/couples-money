import {router, protectedProcedure} from "../trpc";
import { z } from "zod";
import {budgetMonthService, isValidBudgetMonth} from "../../service/budgetMonthService";

const monthYearIdValidation = z.object({ monthYearId: z.string().refine((val) => isValidBudgetMonth(val)) });

export const budgetMonthRouter = router({
  create: protectedProcedure
  .input(monthYearIdValidation)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetMonthService.create(userSession.currentBudgetAccount, input.monthYearId);
  }),
  getBudgetMonth: protectedProcedure
  .input(monthYearIdValidation)
  .query(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetMonthService.getBudgetMonth(userSession.currentBudgetAccount, input.monthYearId);
  }),
  copy: protectedProcedure
  .input(monthYearIdValidation)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetMonthService.copy(userSession.currentBudgetAccount, input.monthYearId);
  }),
  getBudgetMonthOptions: protectedProcedure
  .query(async() => await budgetMonthService.getBudgetMonthOptions())
});
