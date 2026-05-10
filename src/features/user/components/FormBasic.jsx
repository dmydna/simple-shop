import InputCrudFloating from "@/features/crud/components/InputCrudFloating";
import { useUserCrudContext } from "../contexts/UserCrudContext";
import { useEffect } from "react";
import { data } from "react-router-dom";


export default function FormBasic({ children, className }) {

 const {dataItem, handleChange, crudMode, formData,
    isDisabledField, editableFields, handleEnableEdit} = useUserCrudContext();


  return (
    <>
      {/* Producto */}

      {children}
      <>


        <div className="d-flex flex-column flex-lg-row mb-3">

          <div className="me-4">
          <img 
             className="rounded mb-3 border" 
             height={140} 
             width={140} 
             src={formData?.image} 
           />
          </div>


          <div className="d-flex flex-fill flex-column">

        <div className="flex-fill d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"username"}
            label={"Username"}
            useHookCrud={useUserCrudContext}
          />

          <InputCrudFloating
            name={"email"}
            label={"Email"}
            useHookCrud={useUserCrudContext}
          />

        </div>


          <InputCrudFloating
            name={"role"}
            label={"Role"}
            useHookCrud={useUserCrudContext}
          />
          </div>


        </div>








      
      </>

    </>
  )
}
