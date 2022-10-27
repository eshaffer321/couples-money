/*
  Warnings:

  - You are about to drop the column `userId` on the `BudgetAccount` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_BudgetAccountToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BudgetAccountToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "BudgetAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BudgetAccountToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BudgetAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_BudgetAccount" ("id") SELECT "id" FROM "BudgetAccount";
DROP TABLE "BudgetAccount";
ALTER TABLE "new_BudgetAccount" RENAME TO "BudgetAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetAccountToUser_AB_unique" ON "_BudgetAccountToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetAccountToUser_B_index" ON "_BudgetAccountToUser"("B");
