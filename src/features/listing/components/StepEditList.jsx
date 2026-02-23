
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CRUD } from "../../../utils/crud.js";
import { useListingCrud } from "../contexts/ListingCrudContext.jsx";
import {step} from "../../../utils/ListingWizard.js";
import {useWizard} from "../../../contexts/WisardContext.jsx";
;

function StepEditList() {

    const {setCurrentStep, step} = useWizard()

    return (
        <>
            <ul className="list-group list-group-flush">
{/*                <li class={`list-group-item ${ selected("welcome") } `} >
                    <Link className="simple-link" to={asignUrl("welcome")} >
                        <i class="bi bi-wrench fs-5 ps-0 p-2"></i>
                        <span> Welcome </span>
                    </Link>
                </li>*/}
                <li className={`list-group-item`} >
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.PUBLICATION)} >
                        <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> Informacion Basica </span>
                    </Link>
                </li>
{/*                <li class={`list-group-item ${ selected("options") } `} >
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.OPTIONS)}>
                        <i class="bi bi-unlock fs-5 ps-0 p-2"></i>
                        <span> Opciones </span>
                    </Link>
                </li>*/}
{/*                <li class={`list-group-item ${ selected("productTable")} `} >
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.TABLE)}>
                        <div className="item">
                            <i class="bi bi-table fs-5 ps-0 p-2"></i>
                            <span> Select product</span>
                        </div>
                    </Link>
                </li>*/}
                <li className={`list-group-item`} >
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.PRODUCT)}>
                        <div className="item">
                            <i className="bi bi-box fs-5 ps-0 p-2"></i>
                            <span> Detalles Técnicos y Descripción </span>
                        </div>
                    </Link>
                </li>
                <li className={`list-group-item`}>
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.DETAILS)}>
                        <div className="item">
                            <i className="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> Garantia y Envio </span>
                        </div>
                    </Link>
                </li>
                <li className={`list-group-item`} >
                    <Link className="simple-link"
                          onClick={() => setCurrentStep(step.UPLOAD)}>
                        <i className="bi bi-image-fill fs-5 ps-0 p-2"></i>
                        <span> Imagenes </span>
                    </Link>
                </li>
            </ul>
        </>

    )
}

export default StepEditList;