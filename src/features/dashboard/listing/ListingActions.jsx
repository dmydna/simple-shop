import FetchState from "@/components/common/FetchState";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import { useValidParams } from "@hooks/useValidParams";
import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "@dashboard/common/ButtonLink";
import { useUrlParams } from "@/hooks/useUrlParams";
import { ConfirmMessage } from "@/components/common/ConfirmMessage";
import ModalConfirm from "@/components/common/ModalConfirm";
import { MSG_LISTING_DELETE, MSG_LISTING_INACTIVE, MSG_LISTING_ACTIVE } from "@/components/common/MsgConfirm"; 

export default function ListingActions({ close }) {

    const { setId, currentItem, setCurrentItem, loading, error, setError, 
    setSuccess, success, refreshElem, updateStatus } = useListingCrud({autofetch: false})

    // ModalConfirm
    const [showConfirm, setShowConfirm] = useState(false);
    const [dataConfirm, setDataConfirm] = useState([]);
    const [msgConfirm, setMsgConfirm ] = useState();

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    //Params
    const [searchParams, setSearchParams] = useSearchParams();
    const {modeParam, idParam} = useUrlParams()


    // URLs
    const FORM_URL = "/dashboard/listing-form";

    useEffect(() => {
        if (idParam) { setId(idParam) } else { setCurrentItem(null) }
        if (success) { 
            refreshElem(); // refrescar elemento (local)
            setSearchParams(prev => { // refrescar lista (global)
                const newParams = new URLSearchParams(prev);
                newParams.set('tableVersion', Date.now());
                return newParams;
            },{ replace: true });
       }
    }, [idParam, success])


   // VISIBLE BUTTONS

   const isStatusActive = useMemo(()=>{
       return currentItem?.meta?.status === "ACTIVE"
   },[currentItem])


   const isStatusNotActive = useMemo(()=>{
       return currentItem?.meta?.status === "INACTIVE"
   },[currentItem])



  // FORM LINKs

  const EDIT_LINK = useMemo(()=>{
    if(currentItem?.meta?.status === 'DRAFT'){
        return `${FORM_URL}?mode=edit.draft&hash=${currentItem?.id}`
    }
    return `${FORM_URL}?mode=edit&hash=${currentItem?.id}`
  },[currentItem])


  const CREATE_LINK = `${FORM_URL}?mode=create`

  const CLONE_LINK = useMemo(()=>{
    return `${FORM_URL}?mode=create&hash=${currentItem?.id}`
  },[currentItem])

  const VIEW_LINK = useMemo(()=>{
    return `${FORM_URL}?mode=view&hash=${currentItem?.id}`
  },[currentItem])

  const PRODUCT_SPECS_LINK = useMemo(()=>{
    return `/dashboard/product-form?mode=view&id=${currentItem?.productId}`
  },[currentItem])


  // PARAMs VALIDATIONS
  useValidParams({
    id: (val) => val != null, // Solo números
    mode: (val) => ['view','create', 'edit', 'draft', 'edit.draft'].includes(val), // Solo valores permitidos
    status: (val) => ['ACTIVE','INACTIVE','DELETED', 'DRAFT'].includes(val), 
  }, {redirect: "/dashboard/list-list"});



     // ModalConfirm
    const handleStatus = (...args) => {
        const [id, status, ...xs] = args;

        if(status == "ACTIVE") 
            setMsgConfirm(<MSG_LISTING_ACTIVE id={id} />)
        if(status == "INACTIVE") 
            setMsgConfirm(<MSG_LISTING_INACTIVE id={id} />)
        if(status == "DELETED") 
            setMsgConfirm(<MSG_LISTING_DELETE id={id} />)

        setDataConfirm([...args])
        setShowConfirm(true)
    }
    const handleConfirm = () => {
        updateStatus(...dataConfirm)
        setShowConfirm(false)
    }

    return (
        <div className="p-3 island rounded">
           
           <FetchState.Toast
                hook={{ loading, error, setError, success, setSuccess }} 
            >
                 <>
                    <div className="d-flex justify-content-between mb-4">
                        <p style={{ lineHeight: '1.25rem' }} className="fs-6 mb-0 fw-medium p-1">
                            Post Config
                        </p>
                        {close && (
                            <Button style={{ lineHeight: '1.25rem' }}  onClick={close} variant="light" className="p-1">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>


                    <ButtonLink
                        visible={ !currentItem }
                        icon="bi-plus-lg"
                        handle={() => navigate(CREATE_LINK)}
                    >
                        Create
                    </ButtonLink>


                    {/** Item Config **/}



                    <ButtonLink
                        handle={() => navigate(PRODUCT_SPECS_LINK)}
                        icon="bi-box-arrow-up-right"
                        visible={ isStatusActive }
                    >
                        Product Specs
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`/p/${currentItem.id}`)}
                        icon="bi-box-arrow-up-right"
                        visible={ isStatusActive }
                    >
                        View Online
                    </ButtonLink>

                    <ButtonLink
                        handle={ () => handleStatus(currentItem.id, "INACTIVE") }
                        icon="bi-eye-slash"
                        visible={ isStatusActive }
                    >
                        Deactivate
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                        visible={ isStatusNotActive }
                    >
                       Activate
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-image"
                        visible={ isStatusActive }
                    >
                        Change thumbnail
                    </ButtonLink>


                    <ButtonLink
                        visible={ true }
                        handle={() => handleStatus(currentItem?.id, "DELETED")}
                        icon="bi-trash3"
                    >
                        Delete
                    </ButtonLink>



                    <ButtonLink
                        visible={ currentItem }
                        handle={() => navigate(EDIT_LINK) }
                        icon="bi-pencil"
                    >
                        Edit
                    </ButtonLink>

                    {/*  
                        FIXME: Imagenes se crashean al eliminar listing original.  
                        Nota: Actualmente solo copia los enlaces. 
                        se debe re-subir archivo de imagenes.
                    */}
                    <ButtonLink
                        visible={ currentItem }
                        handle={() => navigate(CLONE_LINK)}
                        icon="bi-copy"
                    >
                        Clone
                    </ButtonLink>



                    <ButtonLink
                        visible={ idParam }
                        handle={() => navigate(VIEW_LINK)}
                        icon="bi-three-dots"
                    >
                        Summary
                    </ButtonLink>


                    {/** List Actions **/}

                    <ButtonLink
                        disabled={true}
                        visible={ !idParam }
                        icon="bi-upload"
                        handle={() => navigate('/faqs')}
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        visible={ !idParam }
                        icon="bi bi-download"
                        handle={() => navigate('/faqs')}
                    >
                        Export File
                    </ButtonLink>

                    <ModalConfirm show={showConfirm} >
                        <ConfirmMessage 
                            title={"Confirmar Accion"}
                            message={msgConfirm}
                            onClose={()=>setShowConfirm(false)} 
                            onAction={()=>handleConfirm()}
                        />
                    </ModalConfirm>    

                </>
            </FetchState.Toast>

        </div>
    )
}

