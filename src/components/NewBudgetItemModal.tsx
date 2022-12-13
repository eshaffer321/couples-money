import { Dialog } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { z } from 'zod';
import { trpc } from '../utils/trpc';
import { useZodForm } from '../hooks/useZodForm';

interface Props {
  open: boolean,
  setOpen(value: boolean): any,
  budgetItemContainerId: number
}

export const validations = z.object({
  name: z.string(),
  budgetGroupId: z.number(),
  amount: z.number().min(0.00)
});

export default function NewBudgetItemModal(props: Props) {

  const {budgetItemContainerId} = props;

  const utils = trpc.useContext().budgetMonth;

  const mutation = trpc.budgetItem.create.useMutation({
    onSuccess: async() => {
      await utils.getBudgetMonth.invalidate();
    }
  })

  const methods = useZodForm({
    schema: validations,
    defaultValues: {
      name: '',
      amount: 0.00,
      budgetGroupId: budgetItemContainerId
    }
  });

  return (
    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          {/* Title */}
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Create new Budget Item
          </Dialog.Title>

          <form
            onSubmit={methods.handleSubmit(async (values) => {
              await mutation.mutateAsync(values);
              methods.reset();
              props.setOpen(false);
            })}
          >
            {/* Budget Item Name Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  {...methods.register("name", {
                    setValueAs: (value) => value.trim(),
                  })}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Groceries"
                />
              </div>
              {methods.formState.errors.name?.message && (
                <p className="text-red-700">
                  {methods.formState.errors.name?.message}
                </p>
              )}
            </div>

            {/* Budget Item amount Input */}
            <div className="mt-2">
              <label
                htmlFor="price"
                className="block text-left text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  {...methods.register("amount", {
                    setValueAs: (value) => parseFloat(value),
                  })}
                  type="number"
                  name="amount"
                  id="amount"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USD
                  </span>
                </div>
              </div>
              {methods.formState.errors.amount?.message && (
                <p className="text-red-700">
                  {methods.formState.errors.amount?.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:text-sm"
              >
                {mutation.isLoading ? "Loading..." : "Create"}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm"
                onClick={() => props.setOpen(false)}
                // innerref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>

            <div>
              <input
                {...methods.register("budgetGroupId", {
                  setValueAs(value) {
                      return parseInt(value);
                  },
                })}
                type="number"
                id="budgetGroupId"
                className="invisible"
              />

            </div>
          </form>
        </div>
      </div>
    </Dialog.Panel>
  );

}
