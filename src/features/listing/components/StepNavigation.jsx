import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useListingCrud } from "../contexts/ListingCrudContext.jsx";
import { CRUD } from "../../../utils/crud.js";

import {useWizard} from "../../../contexts/WisardContext.jsx";


export const StepNavigation = () => {

    const { crudMode, currentItem, handleCreate,
        handleUpdate, handleCloseModal, editableFields,
        isSelectedProduct } = useListingCrud()

    const {next, prev, currentStep, step, goTo} = useWizard()

    const modeActions = useMemo(() => {
        switch (crudMode) {
            case CRUD.CREATE: return "Crear"
            case CRUD.UPDATE: return "Actualizar"
            case CRUD.READ:   return "Salir"
            case CRUD.DELETE: return "Eliminar"
        }
    }, [crudMode])


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
        return !currentItem.title || !currentItem.description
    },[currentItem.title, currentItem.description])


    const isDisabledUpdate = useMemo(()  => {
        return (crudMode === CRUD.UPDATE
            && Object.keys(editableFields).length === 0 ||
            crudMode === CRUD.UPDATE && currentStep === step.PRODUCT)
    },[editableFields, crudMode])

    const isDisabledContinue = useMemo(() => {
        return crudMode === CRUD.UPDATE ||
            crudMode === CRUD.CREATE && !isSelectedProduct;
    }, [crudMode, isSelectedProduct]);

    const isVisibleContinue =  useMemo(()=>{
        return currentStep >= 0
            && crudMode === CRUD.CREATE
            && currentStep !==  lastStepToCreate
    },[currentStep, lastStepToCreate, crudMode])

    const isVisibleBack =  useMemo(()=>{
        return  crudMode !== CRUD.UPDATE;
    },[currentStep, crudMode])

    const isVisibleCancel = () => {
        return true
    }

    const isHideApplyChanges = useMemo(()=>{
        return  crudMode === CRUD.CREATE
            && currentStep === lastStepToCreate
            || crudMode === CRUD.UPDATE
            && currentStep !== step.OPTIONS_UPDATE
    },[crudMode, currentStep, lastStepToCreate])


    return (
        <>
            <div className="d-flex w-100 justify-content-between">

                { isVisibleCancel() && (
                    <Button
                        variant="dark border rounded-3 btn-sm"
                        onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                )}
                <div className="w-md-50 d-flex justify-content-end gap-3">
                    {isVisibleBack && (
                        <>
                            <Button
                                variant="outline-secondary border btn-sm rounded-3"
                                onClick={prev}>
                                <i className={`bi bi-chevron-left`}></i>
                                Atras
                            </Button>
                        </>
                    )}
                    { isVisibleContinue && (
                        <Button
                            disabled={isDisabledContinue}
                            variant="outline-secondary border btn-sm rounded-3"
                            onClick={ next }>
                            Continuar <i className={`bi bi-chevron-right`}></i>
                        </Button>
                    )}

                    { isHideApplyChanges && (
                        <>
                            <Button
                                variant={isDisabledUpdate || isDisabledCreate ?
                                    "outline-secondary border btn.sm rounded-3" : "primary border rounded-3"}
                                onClick={
                                    crudMode === CRUD.CREATE && handleCreate ||
                                    crudMode === CRUD.UPDATE && handleUpdate
                                }
                                disabled={isDisabledCreate || isDisabledUpdate}
                            >
                                {modeActions}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>


    )
}