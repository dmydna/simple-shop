import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";

function FormSku({children, className}){

    const {dataItem, handleChange, crudMode,
    isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
        <>
            {/* Detalles */}
            {children}

        <div className="d-flex gap-2 flex-column flex-lg-row">

          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />

        </div>
          </>
    )
}


export default FormSku;