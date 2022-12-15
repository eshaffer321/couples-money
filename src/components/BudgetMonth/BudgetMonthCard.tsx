import {ChevronDownIcon, PencilIcon} from '@heroicons/react/20/solid'
import NewBudgetItem from "../BudgetItem/NewBudgetItem";
import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import { BudgetItem, BudgetItemContainer } from '@prisma/client';
import {ControlledInput} from "../ControlledInput";

interface Props {
  budgetItemContainer: BudgetItemContainer & {
      budgetItem: BudgetItem[];
  } 
}

export default function BudgetMonthCard(props: Props) {
  const {budgetItemContainer} = props;
  const [budgetGroupName, setBudgetGroupName] = useState(budgetItemContainer.name);
  const [expanded, setExpanded] = useState(true);

  // calculate the budgeted amount from all budget items
  const budgetedAmount = budgetItemContainer.budgetItem.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const updateBudgetGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }

  return (
    <div className="rounded-md border-b border-gray-200 bg-white py-1 sm:px-1">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        {/*Budget Title and chevron*/}
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <motion.div
              className="ml-2 pt-2"
              initial={true}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <button>
                <ChevronDownIcon className="-ml-0 mr-2 h-5 w-5 text-gray-400"></ChevronDownIcon>
              </button>
            </motion.div>
            <div className="flex-shrink-0">
              <ControlledInput
                value={budgetGroupName}
                onChange={updateBudgetGroupName}
              ></ControlledInput>
            </div>
          </div>
        </div>

        {/*Budgeted Amount*/}
        {/* TODO:// Calculate the amounts from transactions items */}
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <PencilIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <div className="inline-flex items-center">
            600.00/{budgetedAmount}
          </div>
        </div>
      </div>

      {/* Budget Items*/}
      <AnimatePresence initial={true}>
        {expanded && (
          <motion.section
            key={"budget-items"}
            initial={"collapsed"}
            animate={"open"}
            exit={"collapsed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ul role="list" className="divide-y divide-gray-300">
              {budgetItemContainer.budgetItem.map((item) => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">{item.amount}</span>
                  </div>
                </li>
              ))}
            </ul>
            <NewBudgetItem
              budgetItemContainerId={budgetItemContainer.id}
              budgetItemContainerName={budgetItemContainer.name}
            ></NewBudgetItem>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
