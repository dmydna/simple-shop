import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";


function FormBasic({ children, className, baseHook }) {


    return (
        <>
            {children}

            <InputCrudFloating
                name={"title"}
                label={"Title"}
                {...baseHook}
            />

            <div className="my-1 d-flex gap-2 flex-column flex-lg-row">

                <InputCrudFloating
                    name={"price"}
                    type={"number"}
                    label={"Price"}
                    {...baseHook}
                />

                <InputCrudFloating
                    name={"discountPercentage"}
                    type={"number"}
                    label={"Discount Percentage"}
                    {...baseHook}
                />

            </div>

            <InputCrudFloating
                name={"description"}
                label={"Description"}
                as={"textarea"}
                {...baseHook}
            />


        </>
    )
}
export default FormBasic
