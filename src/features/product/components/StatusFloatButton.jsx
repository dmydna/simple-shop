import { toast } from "react-toastify";
import { Card, Col } from "react-bootstrap";
import { HoverIcon } from "./FloatButton"
import React, { } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useAsync } from "@/hooks/useAsync";


export default function StatusFloatButton({item, style, onSuccess, className}){
	
    const navigate = useNavigate();


   const msg_show = "producto visible"
   const msg_hide = "producto oculto"

   const options = {
      onSuccess : (currentStatus) => {
         if (toast.isActive()) return;  
         if(currentStatus.status === "ACTIVE"){
            toast.success(msg_show);
         }else{
            toast.success(msg_hide);
         }
         
         if (currentStatus.status != item.meta.status){
         // Actualiza estado de forma local
         item.meta.status = currentStatus;
         navigate(window.location.pathname)
         }
      } ,
      onError:  (err) => {
         toast.warning(err?.menssage || "error en la operacion!");
      }

    }


    const updateStatus = useAsync(productService.updateStatus, {...options});



	return (

         <HoverIcon
            style={style}
            disabled={updateStatus.loading}
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={updateStatus.execute(item.id, item.meta.status == "ACTIVE" ? "INACTIVE" : "ACTIVE")}
            icon={`eye${item?.meta?.status != "ACTIVE"? "-slash":""}`}
         />
	)
}