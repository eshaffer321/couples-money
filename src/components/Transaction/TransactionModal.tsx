import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Transaction } from "@prisma/client";
import { useState } from "react";

interface Props {
    budgetItemName: string;
    budgetItemId: number;
    transactions: Transaction[];
}

export default function TransactionModal(props: Props) {
  const { budgetItemName, budgetItemId, transaction } = props;
  const [openNewTransactionModal, setOpenNewTransactionModal] = useState(false);

  return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div>
        {/* Heading Icon */}
        {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"> */}
        {/* <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
        {/* </div> */}
        <div className="mt-3 text-center sm:mt-5">
          {/* Title */}
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Transactions for {budgetItemName}
          </Dialog.Title>
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={()=> setOpenNewTransactionModal(true)}
          >
            Add new
          </button>
        </div>
      </div>
    </Dialog.Panel>
  );
}