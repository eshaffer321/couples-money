import { BudgetItem } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { ControlledInput } from "../ControlledInput";
import { motion } from "framer-motion";

interface Props {
  item: BudgetItem;
}

function ListItem(props: Props) {
  const budgetItem = props.item;
  const [budgeItemName, setBudgetItemName] = useState(budgetItem.name);
  const [budgeItemAmount, setBudgetItemAmount] = useState(budgetItem.amount);
  const [isRippleVisible, setIsRippleVisible] = useState(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [listItem, setListItem] = useState<HTMLLIElement | null>(null);

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

  const openTransactionModal = (event: React.MouseEvent<HTMLLIElement>) => {
    setClickPosition({ x: event.clientX, y: event.clientY });
    setListItem(event.currentTarget);

    console.log("open transaction modal");
  };

  useEffect(() => {
    if (clickPosition && listItem) {
      console.log("click position", clickPosition)
      const ripple = document.createElement("div");
      ripple.className = "ripple show";
      ripple.style.top = `${clickPosition.y - listItem.offsetTop - listItem.offsetTop}px`;
    ripple.style.left = `${
      clickPosition.x - listItem.offsetLeft - listItem.offsetLeft
    }px`;
      ripple.style.width = "100%";
      ripple.style.height = "100%";
      listItem.appendChild(ripple);

      setTimeout(() => {
        ripple.classList.remove("show");
        ripple.remove();
      }, 250);
    }
  }, [clickPosition]);

  return (
    <motion.li
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={openTransactionModal}
      key={budgetItem.id}
      className="px-6 py-4 overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">
          <ControlledInput
            value={budgetItem.name}
            onChange={onBudgetItemNameChange}
          />
        </span>
        <span className="text-sm text-gray-500">
          <ControlledInput
            rightAligned={true}
            value={budgetItem.amount}
            onChange={onBudgetItemAmountChange}
          />
        </span>
      </div>
    </motion.li>
  );
}

export default ListItem;
