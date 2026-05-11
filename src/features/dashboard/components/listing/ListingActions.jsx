import { useListingCrud } from "@/features/listing/hooks/useListingCrud";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";
import PageLoading from "@/components/common/PageLoading";
import PageSuccess from "@/pages/errors/PageSuccess";



export default function ListingActions({ close }) {

    const [searchParams] = useSearchParams();
    const hashParam = searchParams.get('hash');


    const { setId, currentItem, setCurrentItem, handleStatus, loading, error, setError, setSuccess, success } = useListingCrud()

    const navigate = useNavigate()
    const BASE_URL = "/dashboard/listing-form";

    useEffect(() => {
        if (hashParam) {
            setId(hashParam)
        }else{
            setCurrentItem(null)
        }
    }, [hashParam])


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
                            {hashParam ? "Post Actions" : "Post Config"}
                        </p>
                        {close && (
                            <Button onClick={close} variant="light" className="">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>


                    <ButtonLink
                        visible={!hashParam}
                        icon="bi-plus-lg"
                        handle={() => navigate('/faqs')}
                    >
                        Create Post
                    </ButtonLink>


                    <ButtonLink
                        visible={!hashParam}
                        icon="bi-pencil-fill"
                        handle={() => navigate('/faqs')}
                    >
                        Create Draft
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        visible={!hashParam}
                        icon="bi-upload"
                        handle={() => navigate('/faqs')}
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        visible={!hashParam}
                        icon="bi bi-download"
                        handle={() => navigate('/faqs')}
                    >
                        Export File
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "INACTIVE")}
                        icon="bi-eye-slash"
                        visible={currentItem?.status === "INACTIVE"}
                    >
                        Hide Post
                    </ButtonLink>

                    <ButtonLink
                        handle={() => navigate(`/dashboard/product-form?mode=view&id=${currentItem.productId}`)}
                        icon="bi-box"
                        visible={currentItem?.status === "ACTIVE"}
                    >
                        View Product
                    </ButtonLink>

                    <ButtonLink
                        handle={() => handleStatus(currentItem.id, "ACTIVE")}
                        icon="bi-eye"
                        visible={currentItem?.status === "INACTIVE"}
                    >
                        Unhide Post
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-image"
                        visible={currentItem?.status === "ACTIVE"}
                    >
                        Change thumbnail
                    </ButtonLink>


                    <ButtonLink
                        visible={currentItem?.status === "ACTIVE"}
                        handle={() => handleDelete(currentItem.id)}
                        icon="bi-trash3"
                    >
                        Delete Post
                    </ButtonLink>

                    <ButtonLink
                        visible={currentItem?.status === "ACTIVE"}
                        handle={() => navigate(`${BASE_URL}?mode=edit&hash=${currentItem.hash}`)}
                        icon="bi-pencil"
                    >
                        Edit Post
                    </ButtonLink>


                    <ButtonLink
                        visible={currentItem?.status === "ACTIVE"}
                        handle={() => navigate(`${BASE_URL}?mode=view&hash=${currentItem.hash}`)}
                        icon="bi-three-dots-vertical"
                    >
                        Post summary
                    </ButtonLink>
                </>
            )}

        </div>
    )
}

