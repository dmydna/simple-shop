import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorite } from "@/features/favorite/hooks/useFavorite.js"
import { useListingCrud } from "@/features/listing/hooks/useListingCrud.js"
import { toast } from "react-toastify";
import { IconFill, IconTint } from "./FloatButton"
import {useAuthContext} from "@features/auth/contexts/AuthContext"
import React, { useState } from "react";





export default function  ProductButtonBar({item}){

	const {isAdmin} = useAuthContext()
    const { createFavorite } = useFavorite()
    const { handleStatus } = useListingCrud()
    // Hide/Show buttons crud
    const [hide, setHide] = useState(true)

    const handleAddFavorite = () => {
      createFavorite(item.id) 
      if (toast.isActive()) return;
      toast.success("agregado a favoritos");
    };

    const handleHide = () => {
      setHide(prev => !prev)
    } 	

    const handleDelete= async () => {
    	await handleStatus(item.id, "DELETED")
    	// Actualiza estado de forma local
    	item.meta.status = "DELETED";
    	if (toast.isActive()) return;
      	toast.success("producto eliminado");
    }


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
    	await handleStatus(item.id, status)
    	// Actualiza estado de forma local
    	item.meta.status = status;
    	if (toast.isActive()) return;
      	toast.success(msg);
    }


	return(
             <div className="d-flex gap-2 position-absolute w-100 left-0 justify-content-between px-2">
  
                <div className='d-flex gap-2'>
                    {hide && (
                        <>
                            <IconFill
                               className="border rounded-circle" 
                               action={handleAddFavorite}
                               icon="heart"
                            />
        
                            {item?.meta?.status == "DRAFT" && (
                            <span style={{lineHeight:'10px', padding: '5px', fontSize: '.9rem'}}
                                className='pill-dark my-2 z-index-10'>
                                draft
                            </span>)}
        
                            {item?.meta?.status == "INACTIVE" && (
                            <span style={{lineHeight:'10px', padding: '5px', fontSize: '.9rem'}}
                                className='pill-danger my-2 z-index-10'>
                                inactive
                            </span>)}
                        </>
                    )}

                    {!hide && (
                        <>
                            <IconFill
                               className="border rounded-circle" 
                               action={handleDelete}
                               icon="trash3"
                            />
        
                            <IconFill
                               className="border rounded-circle" 
                               action={handleToggle}
                               icon={`eye${item?.meta?.status != "ACTIVE"? "-slash":""}`}
                            />
                        </>
                    )}

                </div>
                    
                {isAdmin && (
                    <IconTint
                      className="rounded-circle align-selft-end" 
                      action={handleHide}
                      icon={`three-dots${hide ? '' : '-vertical'}`}
                    />
                )}

              </div>
	)
}