import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import {budgetAccountService} from "../../../server/service/budgetAccountService";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        if (user.currentBudgetAccountID) {
          session.user.currentBudgetAccount = user.currentBudgetAccountID;
        }

        if (!session.user.currentBudgetAccount ) {
          const budgetAccountId = await budgetAccountService.getBudgetAccountIdByUserId(user.id);
          if (budgetAccountId) {
            session.user.currentBudgetAccount = budgetAccountId
          }
        }
      }

      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: "my-awesome-secret-yooo",
  debug: true
};

export default NextAuth(authOptions);
