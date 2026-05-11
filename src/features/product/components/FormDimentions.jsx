import { TagsList } from "@/components/common/TagsList";
import InputCrudFloating from "@/features/crud/components/InputCrudFloating";
import { useProductCrudContext } from "../contexts/ProductCrudContex";
import FormCategory from "./FormCategory";


function FormDimentions({ children, className, crudHook }) {

  return (
    <>
      {/* Producto */}

      {children}

      <>

       <p className='fw-medium'>Dimentions:</p>

        <div className="d-flex gap-2 flex-column flex-lg-row">

          <InputCrudFloating
            name={"width"}
            label={"width (cm)"}
            baseHook={crudHook}
          />

          <InputCrudFloating
            name={"height"}
            label={"height (cm)"}
            baseHook={crudHook}
          />
          <InputCrudFloating
            name={"depth"}
            label={"depth (cm)"}
            baseHook={crudHook}
          />

        </div>



      </>

    </>
  )
}
export default FormDimentions
