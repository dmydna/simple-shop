import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";
import { useNewListingCrudContext } from "../contexts/newListingCrudContext.jsx";


function FormBasic({ children, className }) {

    const {dataItem, handleChange, crudMode,
    isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
        <>
            {children}

            <InputCrudFloating
                name={"title"}
                label={"Title"}
                useHookCrud={ useListingCrudContext}
            />

            <div className="my-1 d-flex gap-2 flex-column flex-lg-row">

                <InputCrudFloating
                    name={"price"}
                    type={"number"}
                    label={"Price"}
                useHookCrud={useListingCrudContext}
                />

                <InputCrudFloating
                    name={"discountPercentage"}
                    type={"number"}
                    label={"Discount Percentage"}
                useHookCrud={useListingCrudContext}
                />

            </div>

            <InputCrudFloating
                name={"description"}
                label={"Description"}
                useHookCrud={useListingCrudContext}
                as={"textarea"}
            />


        </>
    )
}
export default FormBasic
