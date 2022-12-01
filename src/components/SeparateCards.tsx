import { BudgetItemContainer, MonthlyBudget } from "@prisma/client";
import BudgetMonthCard from "./BudgetMonthCard";

interface Props {
    budget: MonthlyBudget & {
        budgetGroup: BudgetItemContainer[];
    } 
}

export default function SeparateCards(props: Props) {
    const {budget} = props;
    console.log(budget);
    return (
        <ul role="list" className="space-y-4">
            {budget.budgetGroup.map((item) => (
                <li key={item.id} className="overflow-hidden bg-white shadow rounded-md py-5 px-4">
                    <BudgetMonthCard budgetItemContainer={item}></BudgetMonthCard>
                </li>
            ))}
        </ul>
    )
}
