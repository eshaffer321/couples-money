/*
  Warnings:

  - You are about to drop the column `firstDayOfMonth` on the `MonthlyBudget` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthlyBudget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "budgetAccountId" INTEGER NOT NULL,
    CONSTRAINT "MonthlyBudget_budgetAccountId_fkey" FOREIGN KEY ("budgetAccountId") REFERENCES "BudgetAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MonthlyBudget" ("budgetAccountId", "id", "name") SELECT "budgetAccountId", "id", "name" FROM "MonthlyBudget";
DROP TABLE "MonthlyBudget";
ALTER TABLE "new_MonthlyBudget" RENAME TO "MonthlyBudget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
