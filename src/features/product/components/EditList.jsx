
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useWizard} from "../../wizardCrud/contexts/WisardContext.jsx";

// @deprecated
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
                          onClick={() => setCurrentStep(step.BASICS)} >
                        <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                        <span> {handleGetStepName(step.BASICS)} </span>
                    </span>
                </li>

            </ul>
        </>

    )
}

export default EditList;