interface Props  {
    headerName: string
}

const PageHeader = (props: Props) => {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {props.headerName} 
        </h1>
        {/* <Modal open={monthSelectModalOpen} setOpen={setMonthSelectModal}>
                <SelectMonthModalTest
                  open={monthSelectModalOpen}
                  setOpen={setMonthSelectModal}
                ></SelectMonthModalTest>
              </Modal>
              <button onClick={() => setMonthSelectModal(true)}>
                my modal button
    </button>*/}
      </div>
    </header>
  );
};

export default PageHeader;
