import { BudgetItem, BudgetItemContainer, MonthlyBudget } from "@prisma/client";
import { useState } from "react";
import BudgetMonthCard from "../BudgetMonth/BudgetMonthCard";
import Modal from "../Modal";
import NewBudgetGroupModal from "./NewBudgetGroupModal";

interface Props {
  budget: MonthlyBudget & {
    budgetGroup: (BudgetItemContainer & { budgetItem: BudgetItem[]; })[];
  };
}

export default function SeparateCards(props: Props) {
  const { budget } = props;
  const [isModalOpen, setModal] = useState(false);

  const newBudgetMonthrelativeOrder =
    budget.budgetGroup.reduce(
      (acc, curr) => (curr.relativeOrder > acc ? curr.relativeOrder : acc),
      0
    ) + 1;

  return (
    <>
      <Modal open={isModalOpen} setOpen={setModal}>
        <NewBudgetGroupModal
          open={isModalOpen}
          setOpen={setModal}
          budgetMonthID={budget.id}
          relativeOrder={newBudgetMonthrelativeOrder}
        />
      </Modal>

      <ul role="list" className="space-y-4">
        {budget.budgetGroup
          .sort((a, b) => a.relativeOrder - b.relativeOrder)
          .map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-md bg-white py-5 px-4 shadow"
            >
              <BudgetMonthCard budgetItemContainer={item}></BudgetMonthCard>
            </li>
          ))}

        {/* dashed outline add new budget group */}
        <li className="overflow-hidden rounded-md bg-white py-5 px-4 shadow">
          <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setModal(true)}
          >
            <span className="block text-sm font-medium text-gray-900">
              Add new budget group
            </span>
          </button>
        </li>
      </ul>
    </>
  );
}
