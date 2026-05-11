import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";
import { useUserCrud } from "@/features/user/hooks/useUserCrud";
import PageLoading from "@/components/common/PageLoading";
import PageError from "@/pages/errors/PageError";
import PageSuccess from "@/pages/errors/PageSuccess";



export default function UserActions({ close }) {

    const [searchParams] = useSearchParams();
    const idParam = searchParams.get('id');
    const modeParam = searchParams.get('mode');

    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError, setSuccess, success } = useUserCrud()

    const navigate = useNavigate()
    const BASE_URL = "/dashboard/user-form";

    useEffect(() => {
        if (idParam) {
            setId(idParam)
        }else{
            setCurrentItem(null)
        }
    }, [idParam])


    return (
        <div className="p-3 island rounded">

            {loading && (<PageLoading />)}
            {success && (<PageSuccess handle={() => setSuccess(false)} />)}
            {error && (<PageError handle={() => setError(null)} />)}
            {!loading && !error && !success && (
                <>
                    <div style={{ lineHeight: '2.5rem' }}
                        className="d-flex justify-content-between mb-4">
                        <p className="fs-6 mb-0 fw-medium">
                            {idParam ? "User Actions" : "User Config"}
                        </p>
                        {close && (
                            <Button onClick={close} variant="light" className="">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <ButtonLink
                        handle={() => navigate(`${BASE_URL}?mode=view&id=${currentItem?.id}`)}
                        icon="bi-three-dots-vertical"
                    >
                        User summary
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                    >
                        Temporary ban
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                    >
                        Remove ban
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "BANNED")}
                        icon="bi-exclamation-triangle"
                    >
                        Permanent ban
                    </ButtonLink>


                    <ButtonLink
                        handle={() => handleDelete(currentItem.id)}
                        icon="bi-trash3"
                    >
                        Delete User
                    </ButtonLink>


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
            )}


        </div>
    )
}

