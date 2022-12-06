import {trpc} from '../../utils/trpc';
import { prisma } from "../db/client";

class BudgetItemService {
    public async create(budgetGroupId: number, budgetItemName: string, budgetAmount: number) {
        return await prisma.budgetItem.create({
            data: {
                name: budgetItemName,
                amount: budgetAmount,
                budgetGroup: {
                    connect: {
                        id: budgetGroupId
                    }
                }  
            },
        });
    }
} 

export const budgetItemService = new BudgetItemService();