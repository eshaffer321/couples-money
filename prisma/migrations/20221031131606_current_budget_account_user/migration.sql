/*
  Warnings:

  - You are about to drop the `_BudgetAccountToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `currentMonthlyBudgetId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BudgetAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_BudgetAccountToUser_B_index";

-- DropIndex
DROP INDEX "_BudgetAccountToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BudgetAccountToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "name" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "currentBudgetAccountID" INTEGER,
    "monthlyBudgetId" INTEGER,
    CONSTRAINT "User_currentBudgetAccountID_fkey" FOREIGN KEY ("currentBudgetAccountID") REFERENCES "BudgetAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "monthlyBudgetId", "name") SELECT "email", "emailVerified", "id", "image", "monthlyBudgetId", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_BudgetAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "BudgetAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetAccount" ("id") SELECT "id" FROM "BudgetAccount";
DROP TABLE "BudgetAccount";
ALTER TABLE "new_BudgetAccount" RENAME TO "BudgetAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
