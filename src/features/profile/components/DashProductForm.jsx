import FormBasic from "@/features/listing/components/FormBasic";
import FormDetails from "@/features/listing/components/FormDetails";
import FormProduct from "@/features/listing/components/FormProduct";
import { useNewListingCrudContext } from "@/features/listing/contexts/newListingCrudContext";
import { CRUD } from "@/utils/crud";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function DashProductForm(){

    const [searchParams] = useSearchParams();
    const postId = searchParams.get('hash');
    const productId = Number(searchParams.get('sku'));
    const editMode = searchParams.get('edit') === 'true';
    
    const {crudMode, handleUpdate, handleCreate,setExpandx, showCrud,
     currentItem, selectedFile, setItemHash, setFormData, formData,modalMode, setModalMode } = useNewListingCrudContext()



    useEffect(()=>{
        if(!editMode) { setModalMode(CRUD.CREATE) } 
        if( editMode) { setModalMode(CRUD.UPDATE) } 
        if(postId){ setItemHash(postId) }
         setFormData(currentItem)
        console.log("post id",currentItem)
        console.log("CURENT ITEM",currentItem)
        console.log("formdata:" ,formData)
    },[postId, currentItem, formData])

    return (
        <>
           {editMode && (<p className="fw-medium fs-5">{`Editar Post ${postId}`}</p>)}
           {!editMode && (<p className="fw-medium fs-5">Crear nuevo Post</p>)}
           <p className="fw-medium">Basicos</p>
           <FormBasic/>
           <p className="fw-medium">Detalles y envios</p>
           <FormDetails />
           <p className="fw-medium">Ficha tecnica</p>
           <FormProduct />
           {editMode && ( 
               <div className="d-flex justify-content-center">
               <Button 
                   onClick={()=>  handleUpdate(currentItem.id, formData, selectedFile) } variant="dark">Guardar Cambios</Button> 
               </div>
            )}
           {!editMode && ( 
            <div className="d-flex gap-3 justify-content-center">
               <Button className="border" variant="light">Borrador</Button> 
               <Button
                 onClick={handleCreate}  
                 variant="dark">Publicar</Button> 
            </div>
           )}
        </>
    )
}

export default DashProductForm;