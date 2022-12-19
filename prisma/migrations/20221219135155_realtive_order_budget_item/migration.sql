/*
  Warnings:

  - Added the required column `relativeOrder` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetItem" ADD COLUMN     "relativeOrder" INTEGER NOT NULL;
