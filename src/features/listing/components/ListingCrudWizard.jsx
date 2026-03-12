import WizardCrud from "../../wizardCrud/components/WizardCrud.jsx";
import WizardItem from "../../wizardCrud/components/WizardItem.jsx";
import SearchProductForCreate from "./SearchProductForCreate.jsx";
import CrudAccordion from "../../../components/common/CrudAccordion.jsx";
import AccordionInfo from "./AccordionInfo.jsx";
import AccordionEdit from "./AccordionEdit.jsx";
import AccordionDanger from "./AccordionDanger.jsx";
import FormBasic from "./FormBasic.jsx";
import FormProducts from "./FormProduct.jsx";
import {CRUD} from "../../../utils/crud.js";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import FormDetails from "./FormDetails.jsx";
import FormUploadImage from "./FormUploadImage.jsx";
import React, {useMemo, useState} from "react";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";
import {getVisibleSteps, step} from "../hooks/wizardConfig.js";

function ListingCrudWizard(){

    const { crudMode, currentItem, setExpandx,
        handleUpdate, handleCreate, showCrud } = useListingCrud()


    const handleSubmit = () => {
        if(crudMode === CRUD.UPDATE) handleUpdate();
        if(crudMode === CRUD.CREATE) handleCreate();
    }
    const handleClose = () => {
        setExpandx(false)
    }

    return (
        <WizardCrud
            updateRef={ currentItem }
            mode={ crudMode }
            getVisibleSteps={ getVisibleSteps }
            step={ step }
            show={ showCrud  }
            onCancel={ handleClose }
            onSubmit={ handleSubmit }
        >
            <WizardItem eventKey={step.OPTIONS_CREATE}>
                <SearchProductForCreate />
            </WizardItem>
            <WizardItem eventKey={step.OPTIONS_UPDATE}>
                <CrudAccordion defaultKey="0" currentItem={currentItem}>
                    <AccordionInfo
                        className='border-0 border-bottom'
                        eventKey="0" >Information
                    </AccordionInfo>
                    <AccordionEdit
                        className='border-0 border-bottom'
                        eventKey="1">Edit Zone
                    </AccordionEdit>
                    <AccordionDanger
                        className='border-0'
                        eventKey="2">Danger Zone
                    </AccordionDanger>
                </CrudAccordion>
            </WizardItem>
            <WizardCrud.Item eventKey={step.PUBLICATION}>
                <FormBasic  >
                    <p className='fs-5 pb-3 fw-semibold'> Informacion Basica </p>
                    <p
                        style={{ opacity: '.5' }}
                        className="d-none my-4 small">
                        Los campos a completar son necesarios para finalizar el proceso.
                    </p>
                </FormBasic>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={step.PRODUCT}>
                <FormProducts>
                    <p className='fs-5 fw-semibold'> Producto </p>
                    {crudMode === CRUD.UPDATE &&
                        <Alert>
                            Para <b>editar</b> el producto <b>asociado</b> a esta publicacion
                            ve a la seccion correspondiente <b><Link to={'#'}>(*?)</Link></b>
                        </Alert> }
                </FormProducts>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={step.DETAILS}>
                <FormDetails/>
            </WizardCrud.Item>
            <WizardCrud.Item eventKey={step.UPLOAD}>
                <FormUploadImage productId={currentItem.id} />
            </WizardCrud.Item>
        </WizardCrud>
    )
}

export default ListingCrudWizard