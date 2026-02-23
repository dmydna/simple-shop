import Breadcrumb from 'react-bootstrap/Breadcrumb';
import React from "react";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";
import {CRUD} from "../../../utils/crud.js";
import {useWizard} from "../../../contexts/WisardContext.jsx";


export const StepBreadcrumb = () => {

    const { crudMode, handleCloseModal } = useListingCrud()
    const { currentStep, goTo, step, currentStepData } = useWizard();


    const handleGetCurrentName = () =>{
        if (!currentStepData) return
        return currentStepData.url
    }


    const goToStart = () => {
        if(crudMode === CRUD.CREATE ) goTo(step.OPTIONS_CREATE)
        if(crudMode === CRUD.UPDATE ) goTo(step.OPTIONS_UPDATE)
    }


    return (
        <div className='d-flex justify-content-between'>
            <Breadcrumb className='normalize-breadcrumb'>
                <Breadcrumb.Item onClick={goToStart}>
                    <i className='bi bi-folder me-2'></i>
                    {  crudMode === CRUD.UPDATE ? 'Edit Listing' : 'New Listing' }
                </Breadcrumb.Item>
                {currentStep !== step.OPTIONS_CREATE &&
                    currentStep !== step.OPTIONS_UPDATE && (
                    <Breadcrumb.Item href="#">
                        {handleGetCurrentName().toUpperCase()}
                    </Breadcrumb.Item>
                )}
            </Breadcrumb>
            <i  onClick={handleCloseModal}
                style={{scale: '1.3', opacity: '.8'}}
                className='bi bi-x-circle-fill onhover'></i>
        </div>

    )
}
