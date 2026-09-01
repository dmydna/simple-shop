import { HoverIcon } from "@/components/common/FloatButtonCollection";
import { listingService } from "@/features/listing/services/listingService";
import { useAsync } from "@hooks/useAsync";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function DeleteFloatButton({item, style, className}){
	
    const navigate = useNavigate();

    const onSuccess = (currentStatus) => {
      if (toast.isActive()) return;  
      toast.success("producto eliminado");
      if (currentStatus != item.meta.status){
         // Actualiza estado de forma local
         item.meta.status = currentStatus.status;
         navigate(window.location.pathname)
      }
    } 

    const onError = (err) => {
         toast.warning(err?.mensage || "error en la operacion!");
    }


    const updateStatus = useAsync(listingService.updateStatus, {onSuccess, onError});
 
 


	return (
        <HoverIcon
           disabled={updateStatus.loading}
           style={style}
           className={`border rounded-circle bg-wh01 ${className}`} 
           action={updateStatus.execute}
           icon="trash3"
        />
	)
}
