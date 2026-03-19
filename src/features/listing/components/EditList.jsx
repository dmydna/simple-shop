
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";

function EditList() {

    const {setCurrentStep, step, steps, visibleSteps} = useWizard()

    const handleGetStepName = (key) => {
        if (!steps || steps.length == 0) return
        return steps[key]?.url;
    }

    return (
        <>
            <ul className="list-group list-group-flush">

                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.PUBLICATION)} >
                        <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> {handleGetStepName(step.PUBLICATION)} </span>
                    </span>
                </li>

                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.PRODUCT)}>
                        <div className="item">
                            <i className="bi bi-box fs-5 ps-0 p-2"></i>
                            <span> {handleGetStepName(step.PRODUCT)} </span>
                        </div>
                    </span>
                </li>
                <li className={`list-group-item`}>
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.DETAILS)}>
                        <div className="item">
                            <i className="bi bi-bell fs-5 ps-0 p-2"></i>
                            <span> {handleGetStepName(step.DETAILS)} </span>
                        </div>
                    </span>
                </li>
                <li className={`list-group-item`} >
                    <span className="simple-link"
                          onClick={() => setCurrentStep(step.UPLOAD)}>
                        <i className="bi bi-image-fill fs-5 ps-0 p-2"></i>
                        <span> {handleGetStepName(step.UPLOAD)}  </span>
                    </span>
                </li>
            </ul>
        </>

    )
}

export default EditList;