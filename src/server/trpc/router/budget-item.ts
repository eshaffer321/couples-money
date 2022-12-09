import {router, protectedProcedure} from "../trpc";
import { budgetItemService } from "../../service/budgetItemService";
import {validations} from '../../../components/NewBudgetItemModal';

export const budgetItemRouter = router({
  create: protectedProcedure
  .input(validations)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    // TODO: make sure user has permission to update this resource
    return await budgetItemService.create(input.budgetGroupId, input.name, input.amount);
  }),
});
