import { BudgetItem } from "@prisma/client";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { ControlledInput } from "../ControlledInput";

interface Props {
  item: BudgetItem;
}

function ListItem(props: Props) {
  const budgetItem = props.item;
  const [budgeItemName, setBudgetItemName] = useState(budgetItem.name);
  const [budgeItemAmount, setBudgetItemAmount] = useState(budgetItem.amount);

  const utils = trpc.useContext().budgetMonth;
  const mutation = trpc.budgetItem.update.useMutation({
    onSuccess: async () => {
      await utils.getBudgetMonth.invalidate();
    },
  });

  const onBudgetItemNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetItemName(event.target.value);
    mutation.mutate({
      budgetItemId: budgetItem.id,
      name: event.target.value,
      amount: budgetItem.amount,
    });
  };

  const onBudgetItemAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetItemAmount(parseFloat(event.target.value));
    mutation.mutate({
      budgetItemId: budgetItem.id,
      name: budgetItem.name,
      amount: parseInt(event.target.value),
    });
  };
  console.log(budgetItem);
  return (
    <li key={budgetItem.id} className="px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">
          <ControlledInput
            value={budgetItem.name}
            onChange={onBudgetItemNameChange}
          />
        </span>
        <span className="text-sm text-gray-500">{budgetItem.amount}</span>
      </div>
    </li>
  );
}

export default ListItem;
