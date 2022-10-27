// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import {budgetMonthRouter} from "./budget-month";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  budget_month: budgetMonthRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
