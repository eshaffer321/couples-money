import { Dialog } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import { useZodForm } from '../../hooks/useZodForm';

interface Props {
  open: boolean;
  setOpen(value: boolean): any;
  budgetMonthID: number;
  relativeOrder: number;
}

export const validations = z.object({
  name: z.string(),
  budgetMonthID: z.number(),
  isOpen: z.boolean(),
  relativeOrder: z.number()
});

export default function NewBudgetGroupModal(props: Props) {

  const {budgetMonthID, relativeOrder} = props;

  const utils = trpc.useContext().budgetMonth;

  const mutation = trpc.budgetGroup.create.useMutation({
    onSuccess: async() => {
      await utils.getBudgetMonth.invalidate();
    }
  })

  const methods = useZodForm({
    schema: validations,
    defaultValues: {
      name: '',
      isOpen: true,
      budgetMonthID: budgetMonthID,
      relativeOrder: relativeOrder 
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
            Create new Budget Group
          </Dialog.Title>

          <form
            onSubmit={methods.handleSubmit(async (values) => {
              await mutation.mutateAsync(values);
              methods.reset();
              props.setOpen(false);
            })}
          >
            {/* Budget Group Name Input */}
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
                  placeholder="Food, Transportation, etc."
                />
              </div>
              {methods.formState.errors.name?.message && (
                <p className="text-red-700">
                  {methods.formState.errors.name?.message}
                </p>
              )}
            </div>

            {/* Budget Month Invisible Input */}
            <div className="max-h-0">
              <div>
                <input
                  {...methods.register("budgetMonthID", {
                    setValueAs: (value) => parseFloat(value),
                  })}
                  type="number"
                  name="budgetMonthId"
                  id="budgetMonthId"
                  className="invisible"
                />
              </div>
            </div>

            {/* Invisible isOpen input */}
            <div className="max-h-0">
              <input
                {...methods.register("isOpen", {
                  setValueAs: (value) => (value == "true" ? true : false),
                })}
                type="text"
                id="isOpen"
                className="invisible"
              />
            </div>

            {/* Invisible isOpen input */}
            <div className="max-h-0">
              <input
                {...methods.register("relativeOrder", {
                  setValueAs: (value) => parseInt(value),
                })}
                type="number"
                id="relativeOrder"
                className="invisible"
              />
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
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog.Panel>
  );

}
