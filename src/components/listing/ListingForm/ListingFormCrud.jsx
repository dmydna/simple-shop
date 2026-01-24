import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Img3 from '../../../assets/edit.png';
import Img0 from '../../../assets/message.png';
import { useListingsForm } from "../../../contexts/ListingFormContext";
import { CRUD } from "../../../utils/crud.js";
import ProductSelectTable from "../ProductSelectTable";
import StepDetalles from "./StepDetalles";
import StepProductos from "./StepProducto";
import StepProductOption from "./StepProductOption";
import StepPublicacion from "./StepPublicacion";
import StepUploadImage from "./StepUploadImage";

function ListingFormCrud() {

  const [step, setStep] = useState(0);
  const [isSelectedProduct, setIsSelectedProduct] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const {showModal,modalMode,currentItem, handleCreate, handleUpdate, handleCloseModal, setProductMode, productMode, editableFields, setCurrentItem} = useListingsForm()


  const page = Object.freeze({
    START: 0,
    PUBLICATION: 1,
    PRODUCT_START: 2,
    PRODUCT_TABLE: 3,
    PRODUCT: 4,
    DETAILS: 5,
    UPLOAD_IMAGES: 6,
    CANT_PAGES:6,
  });

  useEffect(() => {
    setEnabled(false)
    setIsSelectedProduct(false)
    setProductMode(null)
    setStep(0)
  }, [showModal])

  const handleNext = () => {
    setStep((prev) => prev + 1)
    const currentStep = step;
    if (modalMode !== CRUD.CREATE) {
      if (currentStep == page.PUBLICATION) {
        setStep(page.PRODUCT)
      }
    }
  }


  const handlePrev = () => {
    setStep((prev) => prev - 1)

    const currentStep = step;
    if (modalMode !== CRUD.CREATE) {
      if (currentStep == page.PRODUCT) {
        setStep(page.PUBLICATION)
      }
    } else {
      if (currentStep == page.PRODUCT_TABLE
        || currentStep == page.PRODUCT) {
        setStep(page.PRODUCT_START)
      }
    }
  };


  const handleProductMode = (mode) => {
    setEnabled(mode === 'SELECT' ? false : true)
    setProductMode(mode)
    setStep(
      mode == "SELECT" ?
        page.PRODUCT_TABLE :
        page.PRODUCT
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

  const modeActions = useMemo(() => {
    switch (modalMode) {
      case CRUD.CREATE: return "Crear"
      case CRUD.UPDATE: return "Actualizar"
      case CRUD.READ:   return "Salir"
      case CRUD.DELETE: return "Eliminar"
    }
  }, [modalMode])


  const isDisabledCreate =  () => {
    return !currentItem.title  || !currentItem.description
  }

  
  const isDisabledUpdate = () => {
    return (modalMode === CRUD.UPDATE && Object.keys(editableFields).length === 0)
  }

  const isDisabledContinue = () => {
    return step == 2 && modalMode != CRUD.UPDATE ||
    step == page.PRODUCT_TABLE && !isSelectedProduct
  }


  return (
    <Modal size="md" fullscreen="md-down" backdrop="static" show={showModal} onHide={handleCloseModal} centered>
      <Modal.Body>
        <Form>

          {step == page.START && modalMode == CRUD.CREATE && (
            <div className="w-100 py-5 d-flex justify-content-spacebetween">
              <div>
                <p className="h2">Crear publicacion</p>
                <p className="my-4">Puedes crear una publicacion rapidamente usando el <b>mismo producto</b> de otra o creando un nuevo producto</p>
              </div>
              <div>
                <img className="ps-3" src={Img0} alt="" />
              </div>
            </div>
          )}

          {step == page.START && modalMode == CRUD.UPDATE &&
            (
              <div className="w-100 py-5 d-flex justify-content-spacebetween">
                <div>
                  <p className="h3">Editar publicacion</p>
                  <p className="my-4">Puedes <b>editar</b> rapidamente una publicacion presionando el boton <i className="bi bi-pencil"></i> de los campos.</p>
                </div>
                <div>
                  <img className="ps-3" src={Img3} alt="" />
                </div>
              </div>
            )}

          {step === page.PUBLICATION && (
            <StepPublicacion >
              <p className="h5 my-4">
                Publicacion
              </p>
            </StepPublicacion>
          )}

          {step == page.PRODUCT_START && (
            <StepProductOption handleProductMode={handleProductMode}>
              <p className="h4">Producto</p>
              <p className="my-2">Para continuar <b>selecciona</b> un producto que ya publicaste rapidamente o <b>crea</b> un nuevo producto</p>
            </StepProductOption>
          )}

          {step == page.PRODUCT_TABLE && (
            <ProductSelectTable handleSelect={handleSelect}>
              <p className='h5 mb-4'> 
                Selecciona un Producto 
              </p>
            </ProductSelectTable>
          )}

          {step == page.PRODUCT && (  
              <StepProductos >
                <p className="h5 my-4">
                  Producto
                </p>
              </StepProductos> 
          )}



          {step === page.DETAILS && (
            <StepDetalles >
              <p className="h5 my-4">
                Detalles
              </p>
            </StepDetalles>  
          )}

          {step === page.UPLOAD_IMAGES && (
            <StepUploadImage 
               productId={currentItem.id}
               title="Subir Imagen del Producto"
            >
            </StepUploadImage>  
          )}

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex w-100 justify-content-between">
          <Button variant="warning" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <div className="w-md-50 d-flex justify-content-end gap-3">
            {step > 0 && (
              <>
                <Button variant="outline-secondary" onClick={handlePrev}>
                  <i className={`bi bi-chevron-left`}></i> Atras
                </Button>
              </>
            )}
            {step < page.CANT_PAGES && (
              <Button
                disabled={ isDisabledContinue() } 
                variant="outline-secondary" 
                onClick={handleNext}>
                Continuar <i className={`bi bi-chevron-right`}></i>
              </Button>
            )}

            {step == page.CANT_PAGES && (
              <>
                <Button
                  variant={ isDisabledUpdate() || isDisabledCreate() ?   "outline-secondary" : "primary" }
                  onClick={
                    modalMode === CRUD.CREATE && handleCreate ||
                    modalMode === CRUD.UPDATE && handleUpdate }
                  disabled={ isDisabledCreate() || isDisabledUpdate() }
                >
                  {modeActions}
                </Button>
              </>
            )}
          </div>
        </div>


      </Modal.Footer>
    </Modal>
  )
}

export default ListingFormCrud;

