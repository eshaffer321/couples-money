// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import {budgetMonthRouter} from "./budget-month";
import { budgetItemRouter } from "./budget-item";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  budgetMonth: budgetMonthRouter,
  budgetItem: budgetItemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
