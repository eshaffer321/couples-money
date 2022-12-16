import { router, protectedProcedure } from "../trpc";
import { validations } from "../../../components/BudgetGroup/NewBudgetGroupModal";
import { budgetGroupService } from "../../service/budgetGroupService";
import { z } from "zod";

const updateValidations = z.object({
  budgetGroupID: z.number(),
  name: z.string().optional(),
  relativeOrder: z.number().optional(),
  isOpen: z.boolean().optional(),
});

export const budgetGroupRouter = router({
  create: protectedProcedure
    .input(validations)
    .mutation(async ({ input, ctx }) => {
      const userSession = ctx.session.user;
      const { budgetMonthID, name, relativeOrder, isOpen } = input;
      // TODO: make sure user has permission to update this resource
      return await budgetGroupService.create(
        budgetMonthID,
        name,
        relativeOrder,
        isOpen
      );
    }),
  update: protectedProcedure
    .input(updateValidations)
    .mutation(async ({ input, ctx }) => {
      const userSession = ctx.session.user;
      const { budgetGroupID, name, relativeOrder, isOpen } = input;
      return await budgetGroupService.update(
        budgetGroupID,
        name,
        relativeOrder,
        isOpen
      );
    }),
});
