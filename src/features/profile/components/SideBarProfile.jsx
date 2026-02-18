
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function SideBarProfile() {

 
    return (
        <>
            <ul class="list-group list-group-flush">
                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/general`}>
                        <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> General </span>
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/password`}>
                        <i className="bi bi-unlock fs-5 ps-0 p-2"></i>
                        <span> Contraseña</span>
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/image`}>
                        <div className="item">
                            <i className="bi bi-person-lock fs-5 ps-0 p-2"></i>
                            <span> Imagen</span>
                        </div>
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/social`}>
                        <div className="item">
                            <i className="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> Social</span>
                        </div>
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/social`}>
                        <div className="item">
                            <i className="bi bi-handbag fs-5 ps-0 p-2"></i>
                            <span> mis compras</span>
                        </div>
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/social`}>
                        <div className="item">
                            <i className="bi bi-star fs-5 ps-0 p-2"></i>
                            <span> reseñas </span>
                        </div>
                    </Link>
                </li>

                <li className="list-group-item">
                    <Link className="simple-link" to={`/user/social`}>
                        <div className="item">
                            <i className="bi bi-heart fs-5 ps-0 p-2"></i>
                            <span> favoritos </span>
                        </div>
                    </Link>
                </li>


            </ul>
        </>

    )
}

export default SideBarProfile;