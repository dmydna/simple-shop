
import StepPublication from "./StepPublication.jsx";
import StepOptionsCreate from "./StepOptionsCreate.jsx";
import ProductSearch from "./ProductSearch.jsx";
import StepProductos from "./StepProduct.jsx";
import {CRUD} from "../../../utils/crud.js";
import StepDetails from "./StepDetails.jsx";
import StepUploadImage from "./StepUploadImage.jsx";
import {StepNavigation} from "./StepNavigation.jsx";
import {Alert, Button, Col} from "react-bootstrap";
import React, {useState} from "react";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";
import StepOptionsEdit from "./StepOptionsEdit.jsx";
import {StepBreadcrumb} from "./StepBreadcrumb.jsx";
import {Link} from "react-router-dom";
import {useWizard} from "../../../contexts/WisardContext.jsx";



function ListingFormCrud({className, style}){

    const { currentStep, step } = useWizard()
    const { crudMode, currentItem } = useListingCrud()

    return (
        <Col style={style} className={`${className ||''}`}>

            <StepBreadcrumb />

            <div className="py-2">

                {currentStep === step.OPTIONS_CREATE && (
                         <StepOptionsCreate></StepOptionsCreate>
                    )}

                {currentStep === step.OPTIONS_UPDATE && (
                        <StepOptionsEdit></StepOptionsEdit>
                    )}


                {currentStep === step.PUBLICATION && (
                    <StepPublication  >
                            <p className='fs-5 pb-3 fw-semibold'> Informacion Basica </p>
                            <p
                                style={{ opacity: '.5' }}
                                className="d-none my-4 small">
                                Los campos a completar son necesarios para finalizar el proceso.
                            </p>
                    </StepPublication>
                )}


                {currentStep === step.PRODUCT && (
                    <StepProductos>
                        <p className='fs-5 fw-semibold'> Producto </p>
                        {crudMode === CRUD.UPDATE &&
                                <Alert>
                                    Para <b>editar</b> el producto <b>asociado</b> a esta publicacion
                                    ve a la seccion correspondiente <b><Link to={'#'}>(*?)</Link></b>
                                </Alert> }
                    </StepProductos>
                )}

                {currentStep === step.DETAILS && (
                    <StepDetails>
                    </StepDetails>
                )}

                {currentStep === step.UPLOAD && (
                        <StepUploadImage
                            productId={currentItem.id}
                        >
                        </StepUploadImage>
                )}
            </div>

            {currentStep !== step.OPTIONS_CREATE &&
                currentStep !== step.OPTIONS_UPDATE && (
                <hr></hr>
            )}

            <StepNavigation
                showNavigation={crudMode === CRUD.CREATE}
            />


        </Col>
    )
}

export default ListingFormCrud;