import { HoverIcon } from "@/components/common/FloatButtonCollection";
import { listingService } from "@/features/listing/services/listingService";
import { useAsync } from "@/hooks/useAsync";
import { useCallback } from "react";
import { toast } from "react-toastify";


export default function StatusFloatButton({ item, style, className }) {
	
   const msg_show = "producto visible"
   const msg_hide = "producto oculto"


   const onSuccess = (currentStatus) => {
      if (toast.isActive()) return;  
      if (currentStatus.status === "ACTIVE") {
         toast.success(msg_show);
      } else {
         toast.success(msg_hide);
      }
      item.meta.status = currentStatus.status;
   } 
   const onError = (err) => {
      toast.warning(err?.menssage || "error en la operacion!");
   }

   const updateStatus = useAsync(listingService.updateStatus, { onSuccess, onError });

   const handle = useCallback(()=>{
      updateStatus.execute(item.id, item.meta.status == "ACTIVE" ? "INACTIVE" : "ACTIVE")
   },[item.id, item.meta.status, updateStatus])


   return (

      <HoverIcon
         style={style}
         disabled={updateStatus.loading}
         className={`border rounded-circle bg-wh01 ${className}`} 
         action={handle}
         icon={`eye${updateStatus.data?.status != "ACTIVE" ? "-slash" : ""}`}
      />
   )
}