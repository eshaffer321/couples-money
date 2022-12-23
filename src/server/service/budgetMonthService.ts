import { prisma } from "../db/client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export interface BudgetMonthSelectOption {
  monthYearId: string;
  isCurrent: boolean;
  displayName: string;
}

/**
 * A service class for managing monthly budgets.
 */
class BudgetMonthService {
  /**
   * Retrieves a specific monthly budget by budget account ID and month/year identifier.
   *
   * @param {number} currentBudgetAccountId - The ID of the budget account that the monthly budget belongs to.
   * @param {string} monthYearId - The month and year identifier for the monthly budget.
   * @returns {Promise<MonthlyBudget>} A promise that resolves to the requested monthly budget.
   */
  public async getBudgetMonth(
    currentBudgetAccountId: number,
    monthYearId: string
  ) {
    return await prisma.monthlyBudget.findFirst({
      where: {
        budgetAccountId: currentBudgetAccountId,
        name: monthYearId,
      },
      include: {
        budgetGroup: {
          include: {
            budgetItem: true,
          },
        },
      },
    });
  }

  public async getBudgetMonthOptions() {
    return getListOfBudgetMonths(6);
  }

  /**
   * Creates a new monthly budget with a default budget group.
   *
   * @param {number} currentBudgetAccountId - The ID of the budget account that the new monthly budget belongs to.
   * @param {string} monthYearId - The month and year identifier for the new monthly budget.
   * @returns {Promise<MonthlyBudget>} A promise that resolves to the newly created monthly budget.
   */
  public async create(currentBudgetAccountId: number, monthYearId: string) {
    return await prisma.monthlyBudget.create({
      data: {
        name: monthYearId,
        budgetAccount: {
          connect: {
            id: currentBudgetAccountId,
          },
        },
        budgetGroup: {
          create: {
            name: "Income",
            relativeOrder: 0,
            isOpen: true,
          },
        },
      },
      include: {
        budgetGroup: true,
      },
    });
  }

  /**
   * Copies budget groups and budget items from a previous month to a new month.
   *
   * @param {number} currentBudgetAccountId - The ID of the budget account that the new monthly budget belongs to.
   * @param {string} monthYearId - The month and year identifier for the new monthly budget.
   * @returns {Promise<MonthlyBudget>} A promise that resolves to the newly created monthly budget.
   */
  public async copy(currentBudgetAccountId: number, monthYearId: string) {
    const mostRecentMonthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        budgetAccount: {
          id: currentBudgetAccountId,
        },
        name: {
          not: null,
        },
      },
      orderBy: {
        name: "asc",
      },
      include: {
        budgetGroup: {
          include: {
            budgetItem: true,
          },
        },
      },
    });

    if (!mostRecentMonthlyBudget) {
      return await prisma.monthlyBudget.create({
        data: {
          budgetAccount: {
            connect: {
              id: currentBudgetAccountId,
            },
          },
          name: monthYearId,
        },
        include: {
          budgetGroup: {
            include: {
              budgetItem: true,
            },
          },
        },
      });
    }

    return await prisma.monthlyBudget.create({
      data: {
        budgetAccount: {
          connect: {
            id: currentBudgetAccountId,
          },
        },
        name: monthYearId,
        budgetGroup: {
          create: mostRecentMonthlyBudget.budgetGroup.map((budgetGroup) => {
            return {
              name: budgetGroup.name,
              relativeOrder: budgetGroup.relativeOrder,
              isOpen: budgetGroup.isOpen,
              budgetItem: {
                create: budgetGroup.budgetItem.map((budgetItem) => {
                  return {
                    relativeOrder: budgetItem.relativeOrder,
                    name: budgetItem.name,
                    amount: budgetItem.amount,
                  };
                }),
              },
            };
          }),
        },
      },
      include: {
        budgetGroup: {
          include: {
            budgetItem: true,
          },
        },
      },
    });
  }
}

const isValidMonthYearId = (monthYear: string) => {
  return dayjs(monthYear, ["M-YYYY", "MM-YYYY"], true).isValid();
};

/**
 * Generates a list of budget month select options.
 *
 * @param {number} amountOfMonths - The number of months to include in the list. The list will include half of the months before the current month, and half of the months after the current month.
 * @returns {BudgetMonthSelectOption[]} An array of budget month select options.
 */
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
      monthYearId: [date.month() + 1, date.year()].join("-"),
      isCurrent: isCurrent,
      displayName: date.format("MMM YYYY"),
    };

    monthList.push(option);
  }
  return monthList;
};

export { isValidMonthYearId as isValidBudgetMonth };
export const budgetMonthService = new BudgetMonthService();
