import { toast } from "react-toastify";
import { Card, Col } from "react-bootstrap";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud.js"
import { HoverIcon } from "./FloatButton"
import React, { } from "react";
import { useNavigate } from "react-router-dom";


export default function DeleteFloatButton({item, style, className}){
	
    const navigate = useNavigate();
    const { handleStatus } = useListingCrud()

    const handleDelete= async () => {

      let status = item.meta.status;
    	const data = await handleStatus(item.id, "DELETED")
      status = data?.meta?.status

    	if (toast.isActive()) return;
      	toast.success("producto eliminado");

      if (status != item.meta.status){
         // Actualiza estado de forma local
         item.meta.status = status;
         navigate(window.location.pathname)
      }
    }


    const toggleStatus = () => {
      if(item.meta.status == "ACTIVE"){
         return "INACTIVE";
      }else{
         return"ACTIVE";
      }
    }

	return (
        <HoverIcon
           style={style}
           className={`border rounded-circle bg-wh01 ${className}`} 
           action={handleDelete}
           icon="trash3"
        />
	)
}