import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../common/ButtonLink";


function UserListConfig({ close, item }) {


    const BASE_URL = '/dashboard/user-form'
    const navigate = useNavigate()

    return (
        <div className="p-3 island rounded">

            <div style={{ lineHeight: '2.5rem' }}
                className="d-flex justify-content-between mb-4">
                <p className="fs-6 mb-0 fw-medium">Configuracion de usuario</p>
                {close && (
                    <Button onClick={close} variant="light" className="">
                        <i className="bi-x-lg "></i>
                    </Button>
                )}
            </div>


            <ButtonLink
                icon="bi-person"
                handle={() => navigate(`${BASE_URL}?mode=view&id=${item.id}`)}
            >
                User summary
            </ButtonLink>


            <ButtonLink
                icon="bi-handbag"
                handle={() => navigate('/faqs')}
            >
                User orders
            </ButtonLink>


            <ButtonLink
                icon="bi-key"
                handle={() => navigate('/faqs')}
            >
                Temporary ban
            </ButtonLink>


            <ButtonLink
                icon="bi-trash3"
                handle={() => navigate('/faqs')}
            >
                Deleted user
            </ButtonLink>

        </div>
    )
}

export default UserListConfig;
