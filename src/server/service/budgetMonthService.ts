import { prisma } from "../db/client";
import dayjs from "dayjs";

export interface BudgetMonthSelectOption {
  id: string;
  isCurrent: boolean;
  displayName: string;
}

class BudgetMonthService {
  public async getCurrent(currentBudgetAccountId: number, month?: string) {
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
    // return await prisma.monthlyBudget.create({
    //     data: {}
    // })
  }

  public async copy() {}
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

const getCurrentDateString = () => {
  const now = new Date();
  const firstDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toLocaleDateString();
  return firstDay.replaceAll("/", "");
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

const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).toLocaleDateString();
  return lastDay.replaceAll("/", "");
};

export { getCurrentDateString, getLastDayOfCurrentMonth };
export const budgetMonthService = new BudgetMonthService();
