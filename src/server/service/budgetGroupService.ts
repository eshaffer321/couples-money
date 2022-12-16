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
  public async update(budgetGroupID: number, name?: string, relativeOrder?: number, isOpen?: boolean) {
    return await prisma.budgetItemContainer.update({
      where: {
        id: budgetGroupID,
      },
      data: {
        name: name ? { set: name } : undefined,
        relativeOrder: relativeOrder ? { set: relativeOrder } : undefined,
        isOpen: isOpen ? { set: isOpen } : undefined,
      },
    });
  }
}

export const budgetGroupService = new BudgetGroupService();