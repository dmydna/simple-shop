import { toast } from "react-toastify";
import { Card, Col } from "react-bootstrap";
import { HoverIcon } from "./FloatButton"
import { useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useAsync } from "@hooks/useAsync"


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


    const updateStatus = useAsync(productService.updateStatus, {onSuccess, onError});
 
 


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