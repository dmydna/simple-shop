import InputCrudFloating from "@/features/crud/components/InputCrudFloating";


function FormAccount({ children, className, crudHook }) {

  return (
    <>
      {/* User */}

      {children}

      <>

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"firstName"}
            label={"FirstName"}
            baseHook={crudHook}
          />
          <InputCrudFloating
            name={"lastName"}
            label={"LastName"}
            baseHook={crudHook}
          />

        </div>

        <InputCrudFloating
          name={"address"}
          label={"address"}
          baseHook={crudHook}
        />

        <InputCrudFloating
          name={"phone"}
          label={"phone"}
          baseHook={crudHook}
        />

      </>

    </>
  )
}
export default FormAccount;
