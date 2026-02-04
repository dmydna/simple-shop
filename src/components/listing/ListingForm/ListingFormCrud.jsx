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
import StepWelcome from "./StepWelcome.jsx";
import { StepNavigation } from "./StepNavigation.jsx";
import { step } from "../../../utils/posts.js";

function ListingFormCrud() {

  const [currentStep, setCurrentStep ] = useState(0);
  const [isSelectedProduct, setIsSelectedProduct] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const {showModal,modalMode,currentItem, handleCreate, handleUpdate, handleCloseModal, setProductMode, productMode, editableFields,setModalMode, setCurrentItem} = useListingsForm()



  useEffect(() => {
    setEnabled(false)
    setIsSelectedProduct(false)
    setProductMode(null)
    setCurrentStep(0)
  }, [showModal])




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
    <Modal size="md" fullscreen="md-down" backdrop="static" show={showModal} onHide={handleCloseModal} centered>
      <Modal.Body>
        <Form>

          {currentStep == step.WELCOME &&  (
           <StepWelcome mode={modalMode}>
           </StepWelcome>
          )}

          {currentStep === step.PUBLICATION && (
            <StepPublicacion >
              <p className="h5 my-4">
                Publicacion
              </p>
            </StepPublicacion>
          )}

          {currentStep == step.OPTIONS && (
            <StepProductOption handleProductMode={handleProductMode}>
              <p className="h4">Producto</p>
              <p className="my-2">
                Para continuar <b>selecciona</b> un producto que ya publicaste rapidamente o <b>crea</b> un nuevo producto
              </p>
            </StepProductOption>
          )}

          {currentStep == step.TABLE && (
            <ProductSelectTable handleSelect={handleSelect}>
              <p className='h5 mb-4'> 
                Selecciona un Producto 
              </p>
            </ProductSelectTable>
          )}

          {currentStep == step.PRODUCT && (  
              <StepProductos >
                <p className="h5 my-4">
                  Producto
                </p>
              </StepProductos> 
          )}



          {currentStep === step.DETAILS && (
            <StepDetalles >
              <p className="h5 my-4">
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

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <StepNavigation 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep}
            isSelectedProduct={isSelectedProduct} 
        />
      </Modal.Footer>
    </Modal>
  )
}

export default ListingFormCrud;

