import { TagsList } from "@/components/common/TagsList";
import { CRUD } from "@utils/enums.js";

function FormTags({ children, className, crudHook }) {

  const { setFormData, crudMode, currentProduct,  editableFields } = crudHook;

  return (
    <>
      {/* Producto */}

      {children}

      <>

         <div className="d-block">
            <p className="fw-medium">Tags</p>
            <TagsList  
               locked={crudMode == CRUD.UPDATE || crudMode == CRUD.CREATE}
               array={currentProduct.tags || []} 
               onChange={(tg)=> setFormData(prev=>({...prev, tags: tg})) } 
            />
         </div>


      </>

    </>
  )
}
export default FormTags;
