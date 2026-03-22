import React, {useMemo, useState} from "react";
import WizardCrud from "../../wizardCrud/components/WizardCrud.jsx";
import WizardItem from "../../wizardCrud/components/WizardItem.jsx";
import {CRUD} from "../../../utils/crud.js";
import { WIZARD_CONFIG } from "../hooks/wizardProductConfig.js";
import {useProductCrud} from "../contexts/ProductCrudContex.jsx";
import AccordionInfo from "./AccordionInfo.jsx"


function ProductCrudWizard(){

    const crudHook = useProductCrud()
    const {crudMode, handleUpdate, handleCreate, setExpandx, currentItem} = crudHook


    const handleSubmit = () => {
        if(crudMode === CRUD.UPDATE) handleUpdate();
        if(crudMode === CRUD.CREATE) handleCreate();
    }
    const handleClose = () => {
        setExpandx(false)
    }

    return (
        <WizardCrud
            steps={ WIZARD_CONFIG }
            onCancel={ handleClose }
            onSubmit={ handleSubmit }
            crudHook={ crudHook }
        >
            <WizardItem eventKey={0}>
                <AccordionInfo />
            </WizardItem>
            <WizardCrud.Item eventKey={1}>
                <p className='h4'>{currentItem.name}  lol</p>
                <p style={{ opacity: '.5' }} className="mt-3 bg-white">
                    {currentItem.id}
                </p>
            </WizardCrud.Item>
        </WizardCrud>
    )
}

export default ProductCrudWizard
