import {router, protectedProcedure} from "../trpc";
import { z } from "zod";
import { budgetItemService } from "../../service/budgetItemService";

export const budgetItemRouter = router({
  create: protectedProcedure
  .input(z.object({name: z.string(), budgetGroupId: z.number(), amount: z.number()}))
  .mutation(async ({ input, ctx }) => {
    const userSession = ctx.session.user;
    // TODO: make sure user has permission to update this resource
    return await budgetItemService.create(input.budgetGroupId, input.name, input.amount);
  }),
});
