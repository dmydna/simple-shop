import { TagsList } from "@/components/common/TagsList";


function FormTags({ children, className, crudHook }) {

  const { setFormData, currentProduct } = crudHook;

  return (
    <>
      {/* Producto */}

      {children}

      <>

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
export default FormTags;
