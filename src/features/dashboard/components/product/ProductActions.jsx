import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";
import { useProductCrud } from "@/features/product/hooks/useProductCrud";
import PageSuccess from "@/pages/errors/PageSuccess";
import PageLoading from "@/components/common/PageLoading";



export default function ProductActions({ close }) {

    const [searchParams] = useSearchParams();
    const idParam = searchParams.get('id');
    const modeParam = searchParams.get('mode');

    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError, setSuccess, success } = useProductCrud()

    const navigate = useNavigate()
    const BASE_URL = "/dashboard/product-form";

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
                            {idParam ? "Product Actions" : "Product Config"}
                        </p>
                        {close && (
                            <Button onClick={close} variant="light" className="">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>



                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                        visible={currentItem?.status === "INACTIVE"}
                    >
                        Hide Product
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`/dashboard/product-form?mode=view&id=${currentItem.id}`)}
                        icon="bi-box"
                        visible={currentItem?.status === "ACTIVE"}
                    >
                        Product Summary
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                        visible={currentItem?.status === "INACTIVE"}
                    >
                        Unhide Product
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-image"
                        visible={currentItem?.status === "ACTIVE"}
                    >
                        Change thumbnail
                    </ButtonLink>


                    <ButtonLink
                        handle={() => handleDelete(currentItem.id)}
                        icon="bi-trash3"
                    >
                        Delete Product
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`${BASE_URL}?mode=edit&id=${currentItem.id}`)}
                        icon="bi-pencil"
                    >
                        Edit Product
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

