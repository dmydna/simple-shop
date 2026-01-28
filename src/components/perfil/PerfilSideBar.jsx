
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function PerfilSideBar() {

 
    return (
        <>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" >
                    <Link className="simple-link" to={`/user/information`}>
                          <i class="bi bi-person-check fs-5 ps-0 p-2"></i>
                          <span> Informacion</span>
                    </Link>
                </li>
                <li class="list-group-item" >
                    <Link className="simple-link" to={`/user/password`}>
                        <i class="bi bi-unlock fs-5 ps-0 p-2"></i>
                        <span> Contraseña</span>
                    </Link>
                </li>
                <li class="list-group-item" >
                    <Link className="simple-link" to={`/user/perfil`}>
                      <div className="item">
                          <i class="bi bi-person-lock fs-5 ps-0 p-2"></i>
                          <span> Perfil</span>
                      </div>
                    </Link>
                </li>
                <li class="list-group-item">
                    <Link className="simple-link" to={`/user/social`}>
                        <div className="item">
                            <i class="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> Social</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </>

    )
}

export default PerfilSideBar;