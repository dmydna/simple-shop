import FetchState from "@/components/common/FetchState";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import { useValidParams } from "@hooks/useValidParams";
import { useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../common/ButtonLink";
import { useUrlParams } from "@/hooks/useUrlParams";


export default function ListingActions({ close }) {

    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError, 
    setSuccess, success, refreshElem } = useListingCrud({autofetch: false})

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    //Params
    const {modeParam, hashParam} = useUrlParams()


    // URLs
    const FORM_URL = "/dashboard/listing-form";

    useEffect(() => {
        if (hashParam) { setId(hashParam) } else { setCurrentItem(null) }
        if (success) { 
            refreshElem(); // refrescar elemento (local)
            setSearchParams(prev => { // refrescar lista (global)
                const newParams = new URLSearchParams(prev);
                newParams.set('tableVersion', Date.now());
                return newParams;
            },{ replace: true });
       }
    }, [hashParam, success])


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
        return `${FORM_URL}?mode=edit.draft&hash=${currentItem?.hash}`
    }
    return `${FORM_URL}?mode=edit&hash=${currentItem?.hash}`
  },[currentItem])


  const CREATE_LINK = `${FORM_URL}?mode=create`

  const CLONE_LINK = useMemo(()=>{
    return `${FORM_URL}?mode=create&hash=${currentItem?.hash}`
  },[currentItem])

  const VIEW_LINK = useMemo(()=>{
    return `${FORM_URL}?mode=view&hash=${currentItem?.hash}`
  },[currentItem])

  const PRODUCT_SPECS_LINK = useMemo(()=>{
    return `/dashboard/product-form?mode=view&id=${currentItem?.productId}`
  },[currentItem])


  // PARAMs VALIDATIONS
  useValidParams({
    id: (val) => val && /^[0-9]+$/.test(val), // Solo números
    mode: (val) => ['view','create', 'edit', 'draft', 'edit.draft'].includes(val), // Solo valores permitidos
    status: (val) => ['ACTIVE','INACTIVE','DELETED', 'DRAFT'].includes(val), 
  }, {redirect: "/dashboard/list-list"});



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
                        Create Post
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
                        handle={() => navigate(`/p/${currentItem.hash}`)}
                        icon="bi-box-arrow-up-right"
                        visible={ isStatusActive }
                    >
                        View Online
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                        visible={ isStatusActive }
                    >
                        Deactivate  Post 
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                        visible={ isStatusNotActive }
                    >
                       Activate Post
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
                        Delete Post
                    </ButtonLink>



                    <ButtonLink
                        visible={ currentItem }
                        handle={() => navigate(EDIT_LINK) }
                        icon="bi-pencil"
                    >
                        Edit Post
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
                        Clone Post
                    </ButtonLink>



                    <ButtonLink
                        visible={ hashParam }
                        handle={() => navigate(VIEW_LINK)}
                        icon="bi-three-dots"
                    >
                        Post summary
                    </ButtonLink>


                    {/** List Actions **/}

                    <ButtonLink
                        disabled={true}
                        visible={ !hashParam }
                        icon="bi-upload"
                        handle={() => navigate('/faqs')}
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        visible={ !hashParam }
                        icon="bi bi-download"
                        handle={() => navigate('/faqs')}
                    >
                        Export File
                    </ButtonLink>


                </>
            </FetchState.Toast>

        </div>
    )
}

