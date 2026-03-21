import {Button} from "react-bootstrap";
import React, {useEffect, useMemo} from "react";
import {useWizard} from "../contexts/WisardContext.jsx";
import {CRUD} from "../../../utils/crud.js";
import {useListingCrud} from "../../listing/contexts/ListingCrudContext.jsx";
import WizardButtons from "./WizardButtons.jsx";

function WizardNavigation({onSubmit, onClose}) {

    const { crudMode, dataItem, editableFields,
        isSelectedProduct } = useListingCrud()

    const { mode, next,prev, currentStep, step, goTo,
        updateRef, firstStep, lastStep } = useWizard()

    // Vuelve al primer step cuando se cierra wizard
    useEffect(()=>{
        const firstStep =
            crudMode === CRUD.CREATE ?
            step.OPTIONS_CREATE : step.OPTIONS_UPDATE
        goTo(firstStep)
    },[crudMode])

    const lastStepToCreate = step.UPLOAD
    const lastStepToUpdate = step.DETAILS

    const isDisabledCreate =  useMemo(()=>{
        if(currentStep !== step.CREATE) return false
        return !updateRef?.title || !updateRef?.description
    },[updateRef?.title, updateRef?.description])


    const isDisabledUpdate = useMemo(()  => {
        if(currentStep !== step.UPDATE) return false
        return (Object.keys(editableFields).length === 0 || currentStep === step.PRODUCT)
    },[editableFields, crudMode])

    const isDisabledContinue = useMemo(() => {
        if(currentStep !== step.CREATE) return false
        return !isSelectedProduct;
    }, [crudMode, isSelectedProduct]);

    const isVisibleContinue =  useMemo(()=>{
        if(crudMode !== CRUD.CREATE) return false
        return currentStep !== lastStep
    },[currentStep , crudMode, firstStep, lastStep])

    const isVisibleBack =  useMemo(()=>{
        return false;
        // return  crudMode !== CRUD.UPDATE;
    },[currentStep, crudMode])

    const isVisibleCancel = useMemo (() => {
        return currentStep > 1
    },[currentStep])

    const isVisibleSubmitCreate = useMemo(()=>{
        if(crudMode !== CRUD.CREATE) return false
        return  currentStep === lastStepToCreate
    },[crudMode, currentStep, lastStepToCreate])

    const isVisibleSubmitUpdate = useMemo(()=>{
        if(crudMode !== CRUD.UPDATE) return false
        return currentStep !== step.OPTIONS_UPDATE
    },[crudMode, currentStep, lastStepToUpdate])

    const isVisibleStepNavbar = useMemo (()=>{
        if(crudMode == CRUD.CREATE) return true
        console.log('Cambio stepbar', currentStep !== firstStep && crudMode == CRUD.UPDATE )
        if(crudMode == CRUD.UPDATE) return currentStep !== firstStep
    },[currentStep, crudMode])

    const show = useMemo(()=>{
        if(currentStep == -1000) return false;
        if(crudMode === CRUD.CREATE) return true;
        if(crudMode === CRUD.UPDATE) return currentStep !== firstStep;
    },[currentStep])



    const config = {
        isVisibleBack, isVisibleCancel,
        isVisibleContinue, isDisabledContinue,
        isVisibleSubmitUpdate, isVisibleSubmitCreate,
        isDisabledUpdate, isDisabledCreate,
        isVisibleStepNavbar,
        show
    }

    const handleSubmit = () => {
        goTo(-1000)  // <-- crud feedback
        onSubmit()
    }


    return (
        <WizardButtons
            show={show}
            onSubmit={handleSubmit}
            onCancel={onClose}
            configButtons={config}
            next={next}
            prev={prev}
        />
    )
}

export default WizardNavigation;