
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";

function EditList() {

    const {setCurrentStep, step} = useWizard()

    return (
        <>
            <ul className="list-group list-group-flush">

                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.PUBLICATION)} >
                        <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> Informacion Basica </span>
                    </span>
                </li>

                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.PRODUCT)}>
                        <div className="item">
                            <i className="bi bi-box fs-5 ps-0 p-2"></i>
                            <span> Detalles Técnicos y Descripción </span>
                        </div>
                    </span>
                </li>
                <li className={`list-group-item`}>
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.DETAILS)}>
                        <div className="item">
                            <i className="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> Garantia y Envio </span>
                        </div>
                    </span>
                </li>
                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.UPLOAD)}>
                        <i className="bi bi-image-fill fs-5 ps-0 p-2"></i>
                        <span> Imagenes </span>
                    </span>
                </li>
            </ul>
        </>

    )
}

export default EditList;