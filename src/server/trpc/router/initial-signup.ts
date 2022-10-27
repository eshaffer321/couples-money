import {initialSignupService} from "../../service/initialSignupService";
import {router, protectedProcedure} from "../trpc";

export const initialSignupRouter = router({
    signup: protectedProcedure.query(async ({ctx}) => {
        const {user} = ctx.session;
        return await initialSignupService.signUpUserIfRequired(user.id, user.currentMonthlyBudgetId);
    })
});