
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CRUD } from "../../../utils/crud";
import { useListingsForm } from "../../../contexts/ListingFormContext";

function PanelSideBar() {
    
    const { page } = useParams()

    const {modalMode} = useListingsForm()
    const selected = (currentPage) => {
        return (page == currentPage ? "" : "muted")
    }

   const asignUrl = (currentPage) => {
        return modalMode == CRUD.UPDATE ? (`/panel/${currentPage}`) : '#'
    }
    return (
        <>
            <ul class="list-group list-group-flush">
                <li class={`list-group-item ${ selected("welcome") } `} >
                    <Link className="simple-link" to={asignUrl("welcome")} >
                        <i class="bi bi-wrench fs-5 ps-0 p-2"></i>
                        <span> Welcome </span>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("publication") } `} >
                    <Link className="simple-link" to={asignUrl("publication")}>
                        <i class="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> Publicacion </span>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("options") } `} >
                    <Link className="simple-link" to={asignUrl("options")}>
                        <i class="bi bi-unlock fs-5 ps-0 p-2"></i>
                        <span> Opciones </span>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("productTable")} `} >
                    <Link className="simple-link" to={asignUrl("productTable")}>
                        <div className="item">
                            <i class="bi bi-table fs-5 ps-0 p-2"></i>
                            <span> Select product</span>
                        </div>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("product") } `} >
                    <Link className="simple-link" to={asignUrl("product")}>
                        <div className="item">
                            <i class="bi bi-person-lock fs-5 ps-0 p-2"></i>
                            <span> Product </span>
                        </div>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("details") } `}>
                    <Link className="simple-link" to={asignUrl("details")}>
                        <div className="item">
                            <i class="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> Details</span>
                        </div>
                    </Link>
                </li>
                <li class={`list-group-item ${ selected("imageUpload") } `} >
                    <Link className="simple-link" to={asignUrl("imageUpload")}>
                        <i class="bi bi-image-fill fs-5 ps-0 p-2"></i>
                        <span> Upload Image </span>
                    </Link>
                </li>
            </ul>
        </>

    )
}

export default PanelSideBar;