import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";


function FormBasic({ children, className, baseHook }) {


    return (
        <>
            {children}

            <InputCrudFloating
                name={"title"}
                label={"Title"}
                useHookCrud={useListingCrudContext}
                baseHook={baseHook}
            />

            <div className="my-1 d-flex gap-2 flex-column flex-lg-row">

                <InputCrudFloating
                    name={"price"}
                    type={"number"}
                    label={"Price"}
                    useHookCrud={useListingCrudContext}
                    baseHook={baseHook}
                />

                <InputCrudFloating
                    name={"discountPercentage"}
                    type={"number"}
                    label={"Discount Percentage"}
                    useHookCrud={useListingCrudContext}
                    baseHook={baseHook}
                />

            </div>

            <InputCrudFloating
                name={"description"}
                label={"Description"}
                useHookCrud={useListingCrudContext}
                as={"textarea"}
                baseHook={baseHook}
            />


        </>
    )
}
export default FormBasic
