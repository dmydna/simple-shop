import { Col, Container, Row, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PanelSideBar from "./PanelSideBar";
import StepPublicacion from "../ListingForm/StepPublicacion"
import StepProductOption from "../ListingForm/StepProductOption"
import StepDetalles from "../ListingForm/StepDetalles";
import StepUploadImage from "../ListingForm/StepUploadImage";
import StepProductos from "../ListingForm/StepProducto";
import StepWelcome from "../ListingForm/StepWelcome";
import { StepNavigation } from "../ListingForm/StepNavigation";
import ProductSelectTable from "../ProductSelectTable";
import { step } from "../../../utils/posts";


import { useSearchParams } from "react-router-dom";
import { CRUD } from "../../../utils/crud";

import { useListingsForm } from "../../../contexts/ListingFormContext";


export default function ListingPanel() {
    const { page } = useParams()
    const [secction, setSecction] = useState(null);
    const navigate = useNavigate()

    const [currentStep, setCurrentStep] = useState(0);
    const [isSelectedProduct, setIsSelectedProduct] = useState(false)
    const [enabled, setEnabled] = useState(true)


    const { showModal, modalMode, currentItem, handleCreate, handleUpdate, handleCloseModal, setProductMode, productMode, editableFields, setCurrentItem, setModalMode } = useListingsForm()


    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        switch (page) {
            case "publication":
                setCurrentStep(step.PUBLICATION); break;
            case "options":
                setCurrentStep(step.OPTIONS); break;
            case "product":
                setCurrentStep(step.PRODUCT); break;
            case "productTable":
                setCurrentStep(step.TABLE); break;
            case "uploadImage":
                setCurrentStep(step.UPLOAD); break;
            case "details":
                setCurrentStep(step.DETAILS); break;
            case "welcome":
                setCurrentStep(step.WELCOME); break
        }
    }, [page])

    // captura el param mandado por use Navigate


  const handleProductMode = (mode) => {
    setEnabled(mode === 'SELECT' ? false : true)
    setProductMode(mode)
    setCurrentStep(
      mode == "SELECT" ?
        step.TABLE :
        step.PRODUCT
    )
  }

  const handleSelect = (elem) => {
    setIsSelectedProduct(true);
    setCurrentItem((prev) => ({
      ...prev,
      product_name: elem.name,
      product_id: elem.id,
      sku: elem.sku,
      brand: elem.brand,
      stock: elem.stock,
      weight: elem.weight
    }))
  }




    return (
        <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`col-12 col-md-6 col-lg-4 px-0 mb-3`}>

                    <div className="border rounded p-4">
                        <PanelSideBar onSelection={setCurrentStep}></PanelSideBar>
                    </div>

                </Col>
                <Col className="col-12 col-md-6 col-lg-7 mx-auto rounded border p-5">

                    <div style={{ minHeight: "400px" }}>

                        {currentStep == step.WELCOME && (
                            <StepWelcome mode={modalMode}></StepWelcome>
                        )}

                        {currentStep == step.PUBLICATION && (
                            <StepPublicacion >
                                <p className="fs-4 mb-4">Informacion de Publicacion</p>
                                <p 
                                   style={{ opacity: '.5' }} 
                                   className="mb-4">
                                    Los campos a completar son necesarios para finalizar el proceso.
                                </p>
                            </StepPublicacion>
                        )}
                        {currentStep == step.OPTIONS && (
                            <StepProductOption handleProductMode={handleProductMode}>
                                <p className="fs-4 mb-4">Producto</p>
                                <p 
                                   style={{ opacity: '.5' }}  
                                   className="mt-4 mb-5 bg-white">
                                   Para continuar <b>selecciona</b> un producto que ya publicaste rapidamente o <b>crea</b> un nuevo producto
                                </p>
                            </StepProductOption>
                        )}
                        {currentStep == step.TABLE && (
                            <ProductSelectTable handleSelect={handleSelect}>
                                <p className='fs-4 mb-4'>
                                    Selecciona un Producto
                                </p>
                            </ProductSelectTable>
                        )}

                        {currentStep == step.PRODUCT && (
                            <StepProductos >
                                <p className="fs-4 mb-4">
                                    Producto
                                </p>
                                {modalMode == CRUD.UPDATE && 
                                <p 
                                   style={{ opacity: '.5' }} 
                                   className="mb-4">
                                    Puedes ver toda la informacion del  producto publicado y solo editar campos especificos como: <b>precio</b> y <b>descuento</b>. <br />
                                    Para <b>editar</b> los demas campos del producto ve a la seccion correspondiente <b>(*?)</b>
                                </p>}

                            </StepProductos>
                        )}

                        {currentStep === step.DETAILS && (
                            <StepDetalles >
                                <p className="fs-4 mb-4">
                                    Detalles
                                </p>
                            </StepDetalles>
                        )}

                        {currentStep === step.UPLOAD && (
                            <StepUploadImage
                                productId={currentItem.id}
                                title="Subir Imagen del Producto"
                            >
                            </StepUploadImage>
                        )}
                    </div>

                    <StepNavigation
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        isSelectedProduct={isSelectedProduct}
                    />

                </Col>

            </Row>

        </Container>
    )

}