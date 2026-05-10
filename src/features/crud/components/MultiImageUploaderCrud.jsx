import MultiImageUploader from "@/components/common/MultiImageUploader";
import { useEffect, useState } from "react";


function MultiImageUploaderCrud({useCrudHook, title}) {

   const { currentItem, setFormData, setSelectedFile } = useCrudHook()
   const [images, setImages] = useState([]); // Array de objetos { id, url, file }
   const createInitialImage = (url, index) => {
      return {
         id:`img-${index}-${Date.now()}`, 
         url:url, 
         file:null // no tiene archivo.
      }
   }
   const getImageUrl = ({ id, url, file }) => url
   const getImageFile = ({ id, url, file }) => file

//  Agrega lista de imagenes del elemento actual , para poder editarlas. 
   useEffect(()=>{
        setImages(currentItem?.images?.map(createInitialImage) || [])
	},[currentItem])


   useEffect(() => {
// Actualiza lista de imagen del elemento actual
    setFormData((prev) => ({
      ...prev,
      images: images?.map(getImageUrl)
    }));
// Actualiza lista de archivos a subir
    setSelectedFile(
       // Se descarta las imagenes iniciales
       images?.map(getImageFile)?.filter((f) => f != null)
      );
   }, [images])

    return (
    <MultiImageUploader 
       setImages={setImages}
       images={images}
    />
    )
}

export default MultiImageUploaderCrud;
