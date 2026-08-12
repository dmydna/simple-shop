import FetchStateToast from "@/components/common/FetchStateToast";
import { useUserCrud } from "@/features/user/hooks/useUserCrud";
import { useValidParams } from "@hooks/useValidParams";
import { useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../common/ButtonLink";
import { useUrlState } from "@/hooks/useUrlState";
import { useUrlParams } from "@/hooks/useUrlParams";





export default function UserActions({ close }) {

    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError,
     setSuccess, success, refreshElem } = useUserCrud()

    const navigate = useNavigate();
    const location = useLocation();

    const {setSearchParams} = useUrlState();

    //Params
    const {modeParam, idParam, tableParam} = useUrlParams()

    //URLs
    const FORM_URL = "/dashboard/user-form";
    const CURRENT_URL = location.pathname;

    useEffect(() => {
        if (idParam) { setId(idParam) } else { setCurrentItem(null) }
        if (success) { 
            // refrescar elemento (local)
            refreshElem(); 
            // refrescar lista (global)
            setSearchParams(prev => ({...prev, tableVersion: Date.now()}))
       }
    }, [idParam, success])


   // Handles
   const isStatusBanned = useMemo(()=>{
       return currentItem?.meta?.status == "BANNED";
   },[currentItem])

   const isDistincActive = useMemo(()=>{
       return currentItem?.meta?.status != "ACTIVE";
   },[currentItem])

   const isStatusActive = useMemo(()=>{
       return currentItem?.meta?.status === "ACTIVE"
   },[currentItem])



  // TODO: manejar rutas muertas de UserList/UserForm.
  useValidParams({
    id: (val) => val != null, // Solo números
    mode: (val) => ['view', 'edit'].includes(val), // Solo valores permitidos
    status: (val) => ['ACTIVE','INACTIVE','BANNED', 'DELETED'].includes(val), 
  }, {redirect: "/dashboard/user-list"});

    return (
        <div className="p-3 island rounded">

           <FetchStateToast 
                hook={{ loading, error, setError, success, setSuccess }}
                fluid 
            >
                <>
                    <div className="d-flex justify-content-between mb-4">
                        <p style={{ lineHeight: '1.25rem' }} className="fs-6 mb-0 fw-medium p-1">
                            {idParam ? "User Config" : "List Config"}
                        </p>
                        {close && (
                            <Button style={{ lineHeight: '1.25rem' }}  onClick={close} variant="light" className="p-1">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <ButtonLink
                        disabled={ true }
                        visible={ !idParam }
                        icon="bi-plus-lg"
                        handle={() => navigate(`${FORM_URL}?mode=create`)}
                    >
                        Create Post
                    </ButtonLink>

                

                    {/** Item Config **/}

                    <ButtonLink
                        handle={() => navigate(`${CURRENT_URL}?id=${currentItem?.id}&dialog=ban.create`)}
                        icon="bi-eye-slash"
                        visible={ isStatusActive }
                    >
                        Temporary ban
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`${CURRENT_URL}?id=${currentItem?.id}&dialog=ban.update`)}
                        icon="bi-eye"
                        visible={ isStatusBanned }
                    >
                        Remove ban
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`${CURRENT_URL}?id=${currentItem?.id}&dialog=ban.create`)}
                        icon="bi-exclamation-triangle"
                        visible={ isStatusActive }
                    >
                        Permanent ban
                    </ButtonLink>


                    <ButtonLink
                        visible={ isDistincActive }
                        handle={() => handleDelete(currentItem?.id)}
                        icon="bi-trash3"
                    >
                        Delete User
                    </ButtonLink>

                    <ButtonLink
                        visible={ idParam }
                        handle={() => navigate(`${FORM_URL}?mode=edit&id=${currentItem?.id}`)}
                        icon="bi-pencil"
                    >
                        Edit User
                    </ButtonLink>

                    <ButtonLink
                        visible={ idParam }
                        handle={() => navigate(`${FORM_URL}?mode=view&id=${currentItem?.id}`)}
                        icon="bi-three-dots-vertical"
                    >
                        User summary
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
                </>

            </FetchStateToast>

        </div>
    )
}

