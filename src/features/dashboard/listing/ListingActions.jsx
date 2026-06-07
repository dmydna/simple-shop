import FetchState from "@/components/common/FetchState";
import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import { useValidParams } from "@hooks/useValidParams";
import { useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../common/ButtonLink";


export default function ListingActions({ close }) {

    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError, 
    setSuccess, success, refreshElem } = useListingCrud({autofetch: false})

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Params
    const hashParam = searchParams.get('hash');
    const modeParam = searchParams.get('mode');

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


   // Handles
   const isDistincActive = useMemo(()=>{
       return currentItem?.meta?.status != "ACTIVE";
   },[currentItem])

   const isStatusActive = useMemo(()=>{
       return currentItem?.meta?.status === "ACTIVE"
   },[currentItem])

   const isStatusDraft = useMemo(()=>{
    console.log("currentItem:", currentItem?.meta?.status )
       return currentItem?.meta?.status == "DRAFT"
   },[currentItem])


   const isStatusNotActive = useMemo(()=>{
       return currentItem?.meta?.status === "INACTIVE"
   },[currentItem])

  // TODO: manejar rutas muertas de ListingList/ListingForm.
  useValidParams({
    id: (val) => val && /^[0-9]+$/.test(val), // Solo números
    mode: (val) => ['view','create', 'edit', 'draft'].includes(val), // Solo valores permitidos
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
                        visible={ !hashParam }
                        icon="bi-plus-lg"
                        handle={() => navigate(`${FORM_URL}?mode=create`)}
                    >
                        Create Post
                    </ButtonLink>


                    {/** Item Config **/}

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                        visible={ isStatusActive }
                    >
                        Deactivate  Post 
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`/dashboard/product-form?mode=view&id=${currentItem.productId}`)}
                        icon="bi-box-arrow-up-right"
                        visible={ isStatusActive }
                    >
                        Linked Product
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
                        visible={ isDistincActive }
                        handle={() => handleStatus(currentItem?.id, "DELETED")}
                        icon="bi-trash3"
                    >
                        Delete Post
                    </ButtonLink>

                    <ButtonLink
                        visible={ isStatusDraft }
                        handle={() => navigate(`${FORM_URL}?mode=draft&hash=${currentItem.hash}`)}
                        icon="bi-pencil"
                    >
                        Edit Post
                    </ButtonLink>


                    <ButtonLink
                        visible={ isStatusActive }
                        handle={() => navigate(`${FORM_URL}?mode=edit&hash=${currentItem.hash}`)}
                        icon="bi-pencil"
                    >
                        Edit Post
                    </ButtonLink>

                    <ButtonLink
                        visible={ hashParam }
                        handle={() => navigate(`${FORM_URL}?mode=create&hash=${currentItem.hash}`)}
                        icon="bi-copy"
                    >
                        Clone Post
                    </ButtonLink>



                    <ButtonLink
                        visible={ hashParam }
                        handle={() => navigate(`${FORM_URL}?mode=view&hash=${currentItem?.hash}`)}
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

