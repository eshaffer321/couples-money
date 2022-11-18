import {useState} from "react";
import NewBudgetItemModal from "./NewBudgetItemModal"
import Modal from "./Modal";

export default function NewBudgetItem() {

  const [isModalOpen, setModal] = useState(false);

  return (
    <>
      <Modal open={isModalOpen} setOpen={setModal}>
          <NewBudgetItemModal open={isModalOpen} setOpen={setModal}/>
      </Modal>

      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={()=>setModal(true)}
      >
        <span className="block text-sm font-medium text-gray-900">Add new Budget Item</span>
      </button>
      </>
  )
}
