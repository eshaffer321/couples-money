import { prisma } from "../db/client";
class  BudgetGroupService{
  public async create(
    monthlyBudgetId: number,
    name: string,
    relativeOrder: number,
    isOpen: boolean
  ) {
    return await prisma.budgetItemContainer.create({
      data: {
        name: name,
        relativeOrder: relativeOrder,
        monthlyBudget: {
          connect: {
            id: monthlyBudgetId,
          },
        },
        isOpen: isOpen,
      },
    });
  }
}

export const budgetGroupService = new BudgetGroupService();