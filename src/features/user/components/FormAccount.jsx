import InputCrudFloating from "@/features/crud/components/InputCrudFloating";
import { useUserCrudContext } from "../contexts/UserCrudContext";



function FormAccount({ children, className }) {

  const { dataItem, ...props } = useUserCrudContext();

  return (
    <>
      {/* Producto */}

      {children}

      <>

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"firstName"}
            label={"FirstName"}
            value={dataItem}
            useHookCrud={useUserCrudContext}
          />
          <InputCrudFloating
            name={"lastName"}
            label={"LastName"}
            value={dataItem}
            useHookCrud={useUserCrudContext}
          />

        </div>

        <InputCrudFloating
          name={"address"}
          label={"address"}
          value={dataItem}
          useHookCrud={useUserCrudContext}
        />

        <InputCrudFloating
          name={"phone"}
          label={"phone"}
          value={dataItem}
          useHookCrud={useUserCrudContext}
        />

      </>

    </>
  )
}
export default FormAccount;
