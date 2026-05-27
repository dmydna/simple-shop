
import InputCrudFloatingUC from "@/features/crud/components/InputCrudFloatingUC.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";

function FormTest({children, className, baseHook}){

    // const {dataItem, handleChange, crudMode,
    // isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
        <>
            {/* Detalles */}
            {children}

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloatingUC
            name={"warrantyInformation"}
            label={"Waranty"}
            baseHook={baseHook}
            isLocked={editableFields["Waranty"]}
            onUnlock={}
          />

          <InputCrudFloatingUC
            name={"shippingInformation"}
            label={"Shipping"}
            baseHook={baseHook}
          />

        </div>
          </>
    )
}


export default FormDetails;