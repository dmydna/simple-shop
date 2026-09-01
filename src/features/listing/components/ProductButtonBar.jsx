import { IconTint } from "@/components/common/FloatButtonCollection";
import DeleteFloatButton from "@/features/listing/components/Button/DeleteFloatButton";
import EditFloatButton from "@/features/listing/components/Button/EditFloatButton";
import StatusFloatButton from "@/features/listing/components/Button/StatusFloatButton";
import { useAuthContext } from "@features/auth/contexts/AuthContext";
import { useState } from "react";



export default function  ProductButtonBar({item}){

	const {isAdmin} = useAuthContext()
    // Hide/Show buttons crud
    const [hide, setHide] = useState(true)

    const handleHide = () => {
      setHide(prev => !prev)
    } 	

	return(
             <div className="d-flex gap-2 position-absolute w-100 left-0 justify-content-between px-2">
  
                <div className='d-flex gap-2'>
                    {hide && (
                        <>
                            {/* <IconFill
                               className="border rounded-circle bg-wh01" 
                               action={handleAddFavorite}
                               icon="heart"
                            />*/}
                            {item?.meta?.status == "DELETED" && (
                            <span style={{borderRadius:'6px', lineHeight:'10px', padding: '6px', fontSize: '.8rem'}}
                                className='pill-warning my-2 z-index-10'>
                                deleted
                            </span>)}
                            {item?.meta?.status == "DRAFT" && (
                            <span style={{borderRadius:'6px', lineHeight:'10px', padding: '6px', fontSize: '.8rem'}}
                                className='pill-dark my-2 z-index-10'>
                                draft
                            </span>)}
                            {item?.meta?.status == "INACTIVE" && (
                            <span style={{borderRadius:'6px', lineHeight:'10px', padding: '6px', fontSize: '.8rem'}}
                                className='pill-danger my-2 z-index-10'>
                                inactive
                            </span>)}
                        </>
                    )}

                    {!hide && (
                        <>
                            <EditFloatButton item={item} />
                            <DeleteFloatButton item={item} />
                            <StatusFloatButton item={item} /> 
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