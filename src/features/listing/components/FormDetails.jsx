import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";

function FormDetails({children, className, baseHook}){

    // const {dataItem, handleChange, crudMode,
    // isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
        <>
            {/* Detalles */}
            {children}

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"warrantyInformation"}
            label={"Waranty"}
            baseHook={baseHook}
          />

          <InputCrudFloating
            name={"shippingInformation"}
            label={"Shipping"}
            baseHook={baseHook}
          />

        </div>
          </>
    )
}


export default FormDetails;