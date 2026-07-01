import { toast } from "react-toastify";
import { Card, Col } from "react-bootstrap";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud.js"
import { IconFill } from "./FloatButton"
import React, { } from "react";
import { useNavigate } from "react-router-dom";


export default function StatusFloatButton({item, style, onSuccess, className}){
	
    const navigate = useNavigate();
    const { handleStatus } = useListingCrud();


    // Toggle Active/Inactive
    const handleToggle = async () => {
      let status = item.meta.status;
      let msg    = "";
      
      if(item.meta.status == "ACTIVE"){
         status = "INACTIVE";
         msg    = " producto oculto "
      }else if(item.meta.status == "INACTIVE"){
         status = "ACTIVE";
         msg    = " producto visible "
      }else{
         return;
      }
      const data = await handleStatus(item.id, status)

      if (toast.isActive()) return;
      toast.success(msg);

      if (data?.meta?.status != item.meta.status){
         // Actualiza estado de forma local
         item.meta.status = data?.meta?.status;
         navigate(window.location.pathname)
      }
    }

	return (

         <IconFill
            style={style}
            className={`border rounded-circle bg-wh01 ${className}`} 
            action={handleToggle}
            icon={`eye${item?.meta?.status != "ACTIVE"? "-slash":""}`}
         />
	)
}