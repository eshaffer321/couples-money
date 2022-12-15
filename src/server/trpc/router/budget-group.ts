import {router, protectedProcedure} from "../trpc";
import {validations} from "../../../components/BudgetGroup/NewBudgetGroupModal";
import { budgetGroupService } from "../../service/budgetGroupService";

export const budgetGroupRouter = router({
  create: protectedProcedure
  .input(validations)
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    const {budgetMonthID, name, relativeOrder, isOpen} = input;
    // TODO: make sure user has permission to update this resource
    return await budgetGroupService.create(budgetMonthID, name, relativeOrder, isOpen);

  }),
});
