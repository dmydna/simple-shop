import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToggleIcon } from "./FloatButton";
import { useAsync } from "@/hooks/useAsync";
import { favoriteService } from "@/features/favorite/services/favoriteService";



export default function FavoriteFloatButton({item, style, className}){
	
//    const { createFavorite, deleteFavorite, isFavoriteProduct } = useFavorite()
   const [isFavorite, setIsFavorite] = useState(false)

   const msg_add = "agregado a favoritos"
   const msg_del = "removido de favoritos"

   const options = (msg) => ({
      onSucess : (response) => {
         setIsFavorite(response.isFavorite);
         if (toast.isActive()) return;
            toast.success(msg);
      },
      onError: (err) =>{
         if (toast.isActive()) return;
            toast.warning(err?.menssage || "error en operacion");
      }

    })

   const createFavorite = useAsync(favoriteService.createFavorite, {...options(msg_add)});
   const deleteFavorite = useAsync(favoriteService.deleteFavorite, {...options(msg_del)});
   const checkFavorite  = useAsync(favoriteService.isFavoriteProduct);

   const checkFavoriteStatus = useCallback(async () => { 
      if(item?.id != undefined) 
         setIsFavorite(await checkFavorite.execute(item.id)) 
   }, [item.id])

    useEffect(() => {
        checkFavoriteStatus();
    }, [checkFavoriteStatus]);

    const toggleFavorite = (item) => {
      if( !isFavorite ) {
         createFavorite.execute(item.id)
      }else{
         deleteFavorite.execute(item.id)
      }
    }


	return (
         <ToggleIcon
            disabled= { createFavorite.loading }
            status={ isFavorite }
         	style={ style }
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={ () => toggleFavorite(item.id) }
            icon="heart"
         />
	)
}