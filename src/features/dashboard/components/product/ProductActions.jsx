import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useProductCrud } from "@/features/product/hooks/useProductCrud";
import FetchState  from "@/components/common/FetchState";
import ButtonLink from "@dashboard/common/ButtonLink";

  // TODO: manejar rutas muertas de ProductList/ProductForm.
export default function ProductActions({ close }) {


    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError,
     setSuccess, success, refreshData, refreshElem } = useProductCrud();

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    //Params
    const idParam = searchParams.get('id');
    const modeParam = searchParams.get('mode');

    // URLs
    const FORM_URL = "/dashboard/product-form";
    const CURRENT_URL = location.pathname;

    useEffect(() => {
        if (idParam ) { setId( idParam ) } else { setCurrentItem(null) }
        if (success) { 
            refreshElem(); // refrescar elemento (local)
            setSearchParams(prev => { // refrescar lista (global)
                const newParams = new URLSearchParams(prev);
                newParams.set('tableVersion', Date.now());
                return newParams;
            },{ replace: true });
       }
    }, [idParam , success])


   // Handles

   const isStatusDraft = useMemo(()=>{
       return currentItem?.meta?.status != "DRAFT";
   },[currentItem])

   const isStatusActive = useMemo(()=>{
       return currentItem?.meta?.status === "ACTIVE"
   },[currentItem])

   const isStatusNotActive = useMemo(()=>{
       return currentItem?.meta?.status === "INACTIVE"
   },[currentItem])


    return (
        <div className="p-3 island rounded">


            <FetchState.Toast 
                hook={{ loading, error, setError, success, setSuccess }}
            >
                <>
                    <div className="d-flex justify-content-between mb-4">
                        <p style={{ lineHeight: '1.25rem' }}  className="fs-6 mb-0 fw-medium p-1">
                            Product Config
                        </p>
                        {close && (
                            <Button style={{ lineHeight: '1.25rem' }}  onClick={close} variant="light" className="p-1">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-plus-lg"
                        visible={ !idParam }
                    >
                        Create Product
                    </ButtonLink>

                    {/** Item Config **/}


                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                        visible={ isStatusActive }
                    >
                        Deactivate Product
                    </ButtonLink>


                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                        visible={ isStatusActive }
                    >
                        Activate  Product
                    </ButtonLink>


                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "DELETED")}
                        icon="bi-trash3"
                        visible={ idParam }
                    >
                        Delete Product
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`${FORM_URL}?mode=edit&id=${currentItem.id}`)}
                        icon="bi-pencil"
                        visible={isStatusActive}
                    >
                        Edit Product
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`${FORM_URL}?mode=draft&id=${currentItem.id}`)}
                        icon="bi-pencil"
                        visible={isStatusDraft}
                    >
                        Edit Product
                    </ButtonLink>


                    <ButtonLink
                        visible={ idParam }
                        handle={() => navigate(`${FORM_URL}?mode=create&id=${currentItem.id}`)}
                        icon="bi-copy"
                    >
                        Clone Product
                    </ButtonLink>


                    <ButtonLink
                        handle={() => navigate(`/dashboard/product-form?mode=view&id=${currentItem.id}`)}
                        icon="bi-three-dots"
                    >
                        Product Summary
                    </ButtonLink>



                    {/** List Actions **/}

                    <ButtonLink
                        disabled={true}
                        icon="bi-file-earmark"
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        icon="bi-file-earmark"
                    >
                        Export File
                    </ButtonLink>


                </>
              
            </FetchState.Toast>

        </div>
    )
}

