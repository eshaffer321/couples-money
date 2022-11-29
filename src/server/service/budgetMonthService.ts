import { prisma } from "../db/client";
import dayjs from "dayjs";

export interface BudgetMonthSelectOption {
  id: string;
  isCurrent: boolean;
  displayName: string;
}

class BudgetMonthService {

  // TODO: This should just return the budget by month.
  // The client should handle creating a new budet month if one doesn't exist.
  public async getBudgetMonth(currentBudgetAccountId: number, month?: string) {

    console.log("Getting budget month by currentBudgetAccountId: " + currentBudgetAccountId + " month: " + month )
    if (month) {
      const monthlyBudgetByMonth = await prisma.monthlyBudget.findFirst({
        where: {
          budgetAccountId: currentBudgetAccountId,
          name: month,
        },
        include: {
          budgetGroup: true,
        },
      });
      return monthlyBudgetByMonth;
    }

    const monthlyBudgetByCurrent = await prisma.monthlyBudget.findFirst({
      where: {
        budgetAccountId: currentBudgetAccountId,
        name: getCurrentMonthString().id,
      },
      include: {
        budgetGroup: true,
      },
    });

    if (!monthlyBudgetByCurrent) {
      return await prisma.monthlyBudget.create({
        data: {
          name: getCurrentMonthString().id,
          firstDayOfMonth: getCurrentMonthString().id,
          budgetAccount: {
            connect: {
              id: currentBudgetAccountId,
            },
          },
        },
      });
    }

    return monthlyBudgetByCurrent;
  }

  public async getBudgetMonthOptions() {
    return getListOfBudgetMonths(6);
  }

  public async create() {
    return await prisma.monthlyBudget.create({
        data: {}
    })
  }

  public async copy() {}
}

const isValidBudgetMonth= (monthYear: string) {
  
}

const getListOfBudgetMonths = (amountOfMonths: number) => {
  let months: number = ~~(amountOfMonths / 2);
  const monthList: BudgetMonthSelectOption[] = [];
  const today = dayjs();
  for (let i = months * -1; i < months; i++) {
    const date = dayjs().add(i, "M");
    let isCurrent = false;
    if (date.month() == today.month() && date.year() == today.year()) {
      isCurrent = true;
    }
    const option: BudgetMonthSelectOption = {
      id: [date.month(), date.year()].join("-"),
      isCurrent: isCurrent,
      displayName: date.format("MMM YYYY"),
    };

    monthList.push(option);
  }
  return monthList;
};

const getCurrentMonthString = () => {
  const date = dayjs();
  const option: BudgetMonthSelectOption = {
    id: [date.month(), date.year].join("-"),
    isCurrent: true,
    displayName: date.format("MMM YYYY"),
  };
  return option;
};

export const budgetMonthService = new BudgetMonthService();
