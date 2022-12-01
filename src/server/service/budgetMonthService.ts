import { prisma } from "../db/client";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export interface BudgetMonthSelectOption {
  monthYearId: string;
  isCurrent: boolean;
  displayName: string;
}

class BudgetMonthService {
  public async getBudgetMonth(
    currentBudgetAccountId: number,
    monthYearId: string
  ) {
    console.log(
      "Getting budget month by currentBudgetAccountId: " +
        currentBudgetAccountId +
        " month year id: " +
        monthYearId
    );
    return await prisma.monthlyBudget.findFirst({
      where: {
        budgetAccountId: currentBudgetAccountId,
        name: monthYearId,
      },
      include: {
        budgetGroup: true,
      },
    });
  }

  public async getBudgetMonthOptions() {
    return getListOfBudgetMonths(6);
  }

  public async create(currentBudgetAccountId:number ,monthYearId: string){
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
          }
        }
      },
      include: {
        budgetGroup: true
      }
    });
  }

  public async copy() {}
}

const isValidMonthYearId = (monthYear: string) => {
  return dayjs(monthYear, ["M-YYYY", "MM-YYYY"], true).isValid();
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
