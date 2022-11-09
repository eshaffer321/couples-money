import {ChevronDownIcon, PencilIcon} from '@heroicons/react/20/solid'
import NewBudgetItem from "./NewBudgetItem";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

const items = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  // More items...
]
export default function BudgetMonthCard() {

  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b rounded-md border-gray-200 bg-white py-1 sm:px-1">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">

        {/*Budget Title and chevron*/}
        <div className="ml-4 mt-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              Food
            </div>
            <motion.div className="pt-2" initial={true} onClick={()=> {setExpanded(!expanded)}}>
              <button>
                <ChevronDownIcon className="-ml-0 mr-2 h-5 w-5 text-gray-400"></ChevronDownIcon>
              </button>
            </motion.div>
          </div>
        </div>

        {/*Budgeted Amount*/}
        <div className="ml-4 mt-4 flex flex-shrink-0">
          <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <div className="items-center inline-flex">
            600.00/800.00
          </div>
        </div>

      </div>

      {/* Budget Items */}
      <AnimatePresence initial={true}>
        {expanded && (
          <motion.section
            key={"budget-items"}
            initial={"collapsed"}
            animate={"open"}
            exit={"collapsed"}
            variants={{
              open: {opacity:1, height: "auto"},
              collapsed: {opacity: 0, height: 0}
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ul role="list" className="divide-y divide-gray-300">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4">heyyy</li>
              ))}
            </ul>
            <NewBudgetItem></NewBudgetItem>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  )
}
