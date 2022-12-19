import {router, protectedProcedure} from "../trpc";
import { budgetItemService } from "../../service/budgetItemService";
import {validations} from '../../../components/BudgetItem/NewBudgetItemModal';
import { z } from "zod";

export const updateValidations = z.object({
  name: z.string(),
  budgetItemId: z.number(),
  amount: z.number(),
});

export const budgetItemRouter = router({
  create: protectedProcedure
  .input(validations)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    // TODO: make sure user has permission to update this resource
    return await budgetItemService.create(input.budgetGroupId, input.name, input.amount, input.relativeOrder);
  }),
  update: protectedProcedure
  .input(updateValidations)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    return await budgetItemService.update(input.budgetItemId, input.name, input.amount);
  }),
});
