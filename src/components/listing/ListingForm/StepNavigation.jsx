import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Img3 from '../../../assets/edit.png';
import Img0 from '../../../assets/message.png';
import { useListingsForm } from "../../../contexts/ListingFormContext";
import { CRUD } from "../../../utils/crud.js";
import { step, wizardSteps, getVisibleSteps, getCurrentIndex, getNextStep, getPrevStep } from "../../../utils/listingWizard.js";
import { useLocation, useNavigate } from "react-router-dom";


export const StepNavigation = ({currentStep, setCurrentStep, isSelectedProduct}) => {

    const { showModal, modalMode, currentItem, handleCreate, handleUpdate, handleCloseModal, setProductMode, productMode, editableFields, setCurrentItem } = useListingsForm()

    const navigate = useNavigate()
    const modeActions = useMemo(() => {
        switch (modalMode) {
            case CRUD.CREATE: return "Crear"
            case CRUD.UPDATE: return "Actualizar"
            case CRUD.READ:   return "Salir"
            case CRUD.DELETE: return "Eliminar"
        }
    }, [modalMode])

    useEffect(() => {
        const current = wizardSteps.find(s => s.id === currentStep)
        if (current) navigate(current.url)
    }, [currentStep])


    const handleNext = () => {
      const next = getNextStep(currentStep, modalMode)
      if (!next) return
      setCurrentStep(next.id)
    }

    const handlePrev = () => {
      const prev = getPrevStep(currentStep, modalMode)
      if (!prev) return
      setCurrentStep(prev.id)
    }
 

    const lastStepToCreate = step.UPLOAD
    const lastStepToUpdate = step.DETAILS

    const isDisabledCreate = () => {
        return !currentItem.title || !currentItem.description
    }


    const isDisabledUpdate = () => {
        return (modalMode === CRUD.UPDATE && Object.keys(editableFields).length === 0)
    }

    const isDisabledContinue = () => {
        return currentStep == 2 && modalMode != CRUD.UPDATE ||
            currentStep == step.TABLE && !isSelectedProduct
    }

    const isHideContinue = () => {
        return currentStep >= 0 && modalMode === CRUD.UPDATE  &&  currentStep !=  lastStepToUpdate
            || currentStep >= 0 && modalMode === CRUD.CREATE  &&  currentStep !=  lastStepToCreate
    }

    const isHideToAppyChanges = () => {
        return  modalMode === CRUD.CREATE  && currentStep == lastStepToCreate ||  
                modalMode === CRUD.UPDATE  && currentStep == lastStepToUpdate
    }


    return (
        <div className="d-flex w-100 justify-content-between">
            <Button variant="warning" onClick={handleCloseModal}>
                Cancelar
            </Button>
            <div className="w-md-50 d-flex justify-content-end gap-3">
                {currentStep > 0 && (
                    <>
                        <Button variant="outline-secondary" onClick={handlePrev}>
                            <i className={`bi bi-chevron-left`}></i> Atras
                        </Button>
                    </>
                )}
                { isHideContinue() && (
                    <Button
                        disabled={isDisabledContinue()}
                        variant="outline-secondary"
                        onClick={ handleNext }>
                        Continuar <i className={`bi bi-chevron-right`}></i>
                    </Button>
                )}

                { isHideToAppyChanges() && (
                    <>
                        <Button
                            variant={isDisabledUpdate() || isDisabledCreate() ? "outline-secondary" : "primary"}
                            onClick={
                                modalMode === CRUD.CREATE && handleCreate ||
                                modalMode === CRUD.UPDATE && handleUpdate}
                            disabled={isDisabledCreate() || isDisabledUpdate()}
                        >
                            {modeActions}
                        </Button>
                    </>
                )}
            </div>
        </div>

    )
}