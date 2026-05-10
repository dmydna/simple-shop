import { useListingCrudContext } from "@/features/listing/contexts/ListingCrudContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";

function ListingFormConfig({ close }) {

    const navigate = useNavigate()
    const { crudMode, handleUpdate, handleCreate, currentItem, selectedFile, setFormData, formData, modalMode, setProductId, setEnableEditableField, handleStatus } = useListingCrudContext()

    const BASE_URL = "/dashboard/listing-form";


    return (
        <div className="p-3 island rounded">

            <div style={{ lineHeight: '2.5rem' }} className="d-flex justify-content-between mb-4">
                <p className="fs-6 mb-0 fw-medium">Configuracion publicacion</p>
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
               handle={() => handleDelete(currentItem.id)}
               icon="bi-trash3" 
            >
                Delete Post
           </ButtonLink>

            <ButtonLink
               handle={() => navigate(`${BASE_URL}?mode=edit&hash=${currentItem.hash}`)}
               icon="bi-pencil" 
            >
                Edit Post
           </ButtonLink>


            <ButtonLink
               icon="bi-file-earmark" 
            >
                Edit Post
           </ButtonLink>




        </div>

    )
}

export default ListingFormConfig;
