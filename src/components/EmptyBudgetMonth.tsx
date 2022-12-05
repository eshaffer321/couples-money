import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { MonthlyBudget } from "@prisma/client";
import { BudgetMonthSelectOption } from "../server/service/budgetMonthService";
import { trpc } from "../utils/trpc";
interface Props {
  selectedBudgetMonth?: BudgetMonthSelectOption;
}

// TODO: Make it so either user can select what previous month to copy, or just copy the last month with any valid data.
// TODO: Make it so the copy is disabled if there is no existing budget month
export default function EmptyBudgetMonthCard(props: Props) {
  const { selectedBudgetMonth, setBudgetMonth } = props;

  if (!selectedBudgetMonth) {
    return <div>Loading...</div>;
  }
  
  const createMutation = trpc.budgetMonth.create.useMutation({onSuccess(data, variables, context) {
     setBudgetMonth(data);
  },});

  const copyBudgetMonth = () => {
    console.log(
      "Copy budget month clicked for " + selectedBudgetMonth.monthYearId
    );
  };

  const createNewBudgetMonth = () => {
    // TODO: create a new budget month for this given motn
    console.log("Create new budget month clicked!");
    createMutation.mutate({ monthYearId: selectedBudgetMonth.monthYearId });
  };

  return (
    <div className="mx-auto max-w-7xl rounded-md bg-white px-4 py-4 drop-shadow-lg sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <DocumentPlusIcon className="display inline h-10 fill-indigo-600"></DocumentPlusIcon>

          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No budget found for {selectedBudgetMonth.displayName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating by copying last month or creating a new
            budget.
          </p>
          <div className="mt-6">
            <button
              type="button"
              disabled
              className="mr-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:opacity-70"
              onClick={() => copyBudgetMonth()}
            >
              {/* <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
              Copy Last Month
            </button>

            <button
              type="button"
              disabled={createMutation.isLoading}
              className="inline-flex h-10 items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => createNewBudgetMonth()}
            >
              {/* <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
              New Budget
            </button>
          </div>
          {createMutation.error && <p>Something went wrong! {createMutation.error.message}</p>}
        </div>
      </div>
    </div>
  );
}
