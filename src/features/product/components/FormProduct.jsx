import { TagsList } from "@/components/common/TagsList";
import InputCrudFloating from "@/features/crud/components/InputCrudFloating";
import { useProductCrudContext } from "../contexts/ProductCrudContex";
import FormCategory from "./FormCategory";


function FormProduct({ children, className }) {

  const { dataItem, handleChange, crudMode, setFormData, formData,
    isDisabledField, handleEnableEdit, editableFields, currentProduct } = useProductCrudContext();

  return (
    <>
      {/* Producto */}

      {children}

      <>

        <div className="d-flex gap-2 flex-column flex-lg-row">
        <InputCrudFloating
          name={"name"}
          label={"Name"}
          value={dataItem}
          useHookCrud={useProductCrudContext}
        />
        

       </div> 

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"brand"}
            label={"Brand"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />
          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />
        </div>

          <InputCrudFloating
            name={"weight"}
            label={"Weight (kg)"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />


       <hr className='my-4'></hr>
       <p className='fw-medium'>Dimentions:</p>

        <div className="d-flex gap-2 flex-column flex-lg-row">

          <InputCrudFloating
            name={"width"}
            label={"width (cm)"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />

          <InputCrudFloating
            name={"height"}
            label={"height (cm)"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />
          <InputCrudFloating
            name={"depth"}
            label={"depth (cm)"}
            value={dataItem}
            useHookCrud={useProductCrudContext}
          />

        </div>

        <FormCategory />

       <hr className='my-4'></hr>

         <div className="d-block">
            <p className="fw-medium">Tags</p>
            <TagsList  
               array={currentProduct.tags || []} 
               onChange={(tg)=> setFormData(prev=>({...prev, tags: tg})) } 
            />
         </div>


      </>

    </>
  )
}
export default FormProduct
