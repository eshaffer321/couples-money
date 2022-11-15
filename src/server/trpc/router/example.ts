import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Helloooooo ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
