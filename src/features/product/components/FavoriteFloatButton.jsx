import { useFavorite } from "@/features/favorite/hooks/useFavorite";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToggleIcon } from "./FloatButton";



export default function FavoriteFloatButton({item, style, className}){
	
    const { createFavorite, deleteFavorite, isFavoriteProduct } = useFavorite()

    const [isFavorite, setIsFavorite] = useState(false)

   const checkFavoriteStatus = useCallback(async () => { 
      if(item?.id != undefined) 
         setIsFavorite(await isFavoriteProduct(item.id)) 
   }, [isFavoriteProduct, item.id])

    useEffect(() => {
        checkFavoriteStatus();
    }, [checkFavoriteStatus]);

   const handleAddFavorite = () => {
      createFavorite(item.id) 
      setIsFavorite(true);
      if (toast.isActive()) return;
      toast.success("agregado a favoritos");
    };

   const handleDeleteFavorite = () => {
      deleteFavorite(item.id) 
      setIsFavorite(false);
      if (toast.isActive()) return;
      toast.success("eliminado de favoritos");
    };

    const toggleFavorite = () => {
      if( !isFavorite ) {
         handleAddFavorite()
      }else{
         handleDeleteFavorite()
      }
    }



	return (
         <ToggleIcon
            status={ isFavorite }
         	style={ style }
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={ toggleFavorite }
            icon="heart"
         />
	)
}