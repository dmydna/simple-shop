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
            {...crudHook}
          />
          <InputCrudFloating
            name={"lastName"}
            label={"LastName"}
            {...crudHook}
          />

        </div>

        <InputCrudFloating
          name={"address"}
          label={"address"}
          {...crudHook}
        />

        <InputCrudFloating
          name={"phone"}
          label={"phone"}
          {...crudHook}
        />

      </>

    </>
  )
}
export default FormAccount;
