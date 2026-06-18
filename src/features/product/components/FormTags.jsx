import { TagsList } from "@/components/common/TagsList";
import { CRUD } from "@utils/enums.js";

function FormTags({ children, className, crudHook }) {

  const { crudMode, currentProduct,  setValue } = crudHook;

  return (
    <>
      {/* Producto */}

      {children}

      <>

         <div className="d-block">
            <p className="fw-medium">Tags</p>
            <TagsList  
               locked={crudMode == CRUD.READ}
               array={currentProduct.tags || []} 
               onChange={(tg)=> setValue("tags",tg) } 
            />
         </div>


      </>

    </>
  )
}
export default FormTags;
