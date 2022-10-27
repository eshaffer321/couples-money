import { createContextInner} from "../context";
import {appRouter, AppRouter} from "./_app";
import {Session} from "next-auth";
import { inferProcedureInput } from "@trpc/server";

test('my first test', async() => {
    const session: Session = {expires: ""};
    const ctx = await createContextInner({session: session});
    const caller = appRouter.createCaller(ctx);

    // const input: inferProcedureInput<AppRouter['test']['test']> = {}
    expect(true).toBe(true);
});

