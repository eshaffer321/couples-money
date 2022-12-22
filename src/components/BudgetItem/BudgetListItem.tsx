import { BudgetItem } from "@prisma/client";
import React, {  useState } from "react";
import { trpc } from "../../utils/trpc";
import { ControlledInput } from "../ControlledInput";
import { motion } from "framer-motion";
import Modal from "../Modal";
import TransactionModal from "../Transaction/TransactionModal";

interface Props {
  item: BudgetItem;
}

function ListItem(props: Props) {
  const budgetItem = props.item;
  const [budgetItemName, setBudgetItemName] = useState(budgetItem.name);
  const [budgetItemAmount, setBudgetItemAmount] = useState(budgetItem.amount);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

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
      amount: budgetItemAmount,
    });
  };

  const onBudgetItemAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetItemAmount(parseFloat(event.target.value));
    mutation.mutate({
      budgetItemId: budgetItem.id,
      name: budgetItemName,
      amount: parseInt(event.target.value),
    });
  };

  return (
    <>
      <Modal open={transactionModalOpen} setOpen={setTransactionModalOpen}>
        <TransactionModal
          budgetItemId={budgetItem.id}
          budgetItemName={budgetItemName}

        ></TransactionModal>
      </Modal>
      <motion.li
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        onClick={() => setTransactionModalOpen(true)}
        key={budgetItem.id}
        className="overflow-hidden px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            <ControlledInput
              value={budgetItemName}
              onChange={onBudgetItemNameChange}
            />
          </span>
          <span className="text-sm text-gray-500">
            <ControlledInput
              rightAligned={true}
              value={budgetItemAmount}
              onChange={onBudgetItemAmountChange}
            />
          </span>
        </div>
      </motion.li>
    </>
  );
}

export default ListItem;
