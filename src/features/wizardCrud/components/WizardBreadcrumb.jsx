import Breadcrumb from 'react-bootstrap/Breadcrumb';
import React, {useEffect} from "react";
import {useListingCrud} from "../../listing/contexts/ListingCrudContext.jsx";
import {CRUD} from "../../../utils/crud.js";
import {useWizard} from "../contexts/WisardContext.jsx";


function WizardBreadcrumb({onClose}) {

    const { visibleSteps, mode, currentStep, firstStep, goTo, currentStepData, reset } = useWizard();

    const handleGetCurrentName = () =>{
        if (!currentStepData) return
        return currentStepData?.url
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    const gotostart = () => {
        goTo(firstStep)
    }


    return (
        <div className='d-flex justify-content-between mb-3'>
            <div className='normalize-breadcrumb'>
                <div
                    className='text-secondary border rounded-4 p-2 px-3' href="#">
                    <i
                        onClick={gotostart}
                        className="bi bi-chevron-left me-3 fw-5 onhover"></i>
                     <span>step<b className='mx-2'> {currentStep - 1 < 0 ? 0 : currentStep - 1} </b>
                         of {" " + visibleSteps.length - 1} </span>
                    <i className="bi bi-three-dots-vertical ms-3 onhover"></i>
                </div>
            </div>
            <i  onClick={handleClose}
                style={{scale: '1.3', opacity: '.8'}}
                className='bi bi-x-circle-fill onhover p-2'></i>
        </div>

    )
}

export default WizardBreadcrumb;