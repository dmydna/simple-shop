
import ButtonLink from "@/features/dashboard/common/ButtonLink";
import { useUserCrudContext } from "@/features/user/contexts/UserCrudContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserFormConfig({ close }) {

    const navigate = useNavigate()
    const { currentItem, handleStatus } = useUserCrudContext()

    const BASE_URL = "/dashboard/listing-form";


    return (
        <div className="p-3 island rounded">

            <div style={{ lineHeight: '2.5rem' }} className="d-flex justify-content-between mb-4">
                <p className="fs-6 mb-0 fw-medium">User Configuration</p>
                {close && (
                    <Button onClick={close} variant="light" className="">
                        <i className="bi-x-lg "></i>
                    </Button>
                )}

            </div>


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


        </div>

    )
}

export default UserFormConfig;
