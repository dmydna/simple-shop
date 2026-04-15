import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";


function FormProduct({ children, className }) {

  const { dataItem, handleChange, crudMode,
    isDisabledField, handleEnableEdit, editableFields } = useListingCrudContext();

  return (
    <>
      {/* Producto */}

      {children}

      <>

        <InputCrudFloating
          name={"productName"}
          label={"Name"}
          value={dataItem}
          useHookCrud={useListingCrudContext}
        />


        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"brand"}
            label={"Brand"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />
          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />
        </div>

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"stock"}
            label={"Stock"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />
          <InputCrudFloating
            name={"weight"}
            label={"weight"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />
        </div>


        <div className="d-flex gap-2">
          <InputCrudFloating
            name={"category"}
            label={"Category"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />
        </div>

      </>

    </>
  )
}
export default FormProduct