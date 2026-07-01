import { useFavorite } from "@/features/favorite/hooks/useFavorite";
import { IconFill } from "./FloatButton";
import { toast } from "react-toastify";

export default function FavoriteFloatButton({item, style, className}){
	
    const { createFavorite } = useFavorite()

	const handleAddFavorite = () => {
      createFavorite(item.id) 
      if (toast.isActive()) return;
      toast.success("agregado a favoritos");
    };

	return (
         <IconFill
         	style={style}
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={handleAddFavorite}
            icon="heart"
         />
	)
}