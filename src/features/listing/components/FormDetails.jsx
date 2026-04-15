import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";

function FormDetails({children, className}){

    const {dataItem, handleChange, crudMode,
    isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
        <>
            {/* Detalles */}
            {children}

          <InputCrudFloating
            name={"warrantyInformation"}
            label={"Waranty"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />

          <InputCrudFloating
            name={"shippingInformation"}
            label={"Shipping"}
            value={dataItem}
            useHookCrud={useListingCrudContext}
          />

          </>
    )
}


export default FormDetails;