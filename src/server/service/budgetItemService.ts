import {trpc} from '../../utils/trpc';
import { prisma } from "../db/client";

class BudgetItemService {
    public async create(budgetGroupId: number, budgetItemName: string, budgetAmount: number, relativeOrder: number) {
        return await prisma.budgetItem.create({
            data: {
                name: budgetItemName,
                amount: budgetAmount,
                relativeOrder: relativeOrder,
                budgetGroup: {
                    connect: {
                        id: budgetGroupId
                    }
                }  
            },
        });
    }

    public async update(budgetItemId: number, budgetItemName: string, budgetAmount: number) {
        return await prisma.budgetItem.update({
            where: {
                id: budgetItemId
            },
            data: {
                name: budgetItemName,
                amount: budgetAmount,
            },
        });
    }
} 

export const budgetItemService = new BudgetItemService();