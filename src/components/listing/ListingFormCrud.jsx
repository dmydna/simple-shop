import React, { useEffect, useState, useMemo } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import Img0 from '../../assets/message.png';
import Img1 from '../../assets/box.png';
import Img2 from '../../assets/eye-care.png';
import Img3 from '../../assets/edit.png';
import ProductSelectTable from "./ProductSelectTable";
import { CRUD } from "../common/crudUtils";

function ListingFormCrud({
  showModal,
  handleCloseModal,
  modalMode,
  currentItem,
  onCurrentItem,
  handleChange,
  handleUpdate,
  handleCreate
}) {

  const [step, setStep] = useState(0);
  const [productMode, setProductMode] = useState("")
  const [showTableProducts, setShowTableProduct] = useState(false)
  const [enabled, setEnabled] = useState(true)


  const page = Object.freeze({
    START: 0,
    PUBLICATION: 1,
    PRODUCT_START: 2,
    PRODUCT_TABLE: 3,
    PRODUCT: 4,
    DETAILS: 5
  });

  useEffect(() => {
    setEnabled(false)
    setProductMode("")
    setShowTableProduct(false)
    setStep(0)
  }, [showModal])

  const handleNext = () => {

    setStep((prev) => prev + 1)
    setShowTableProduct(false)

    const currentStep = step;
    if (modalMode !== CRUD.CREATE) {
      if (currentStep == page.PUBLICATION) {
        setStep(page.PRODUCT)
      }
    }
  }


  const handlePrev = () => {
    setStep((prev) => prev - 1)
    setShowTableProduct(false)

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

  const productCreateProduct = () => {
    setProductMode(CRUD.CREATE);
    onCurrentItem((prev) => ({
      ...prev,
      product_name: "",
      sku: "",
      brand: "",
      stock: "",
      weight: ""
    }));
  };

  const handleSelectProduct = (elem) => {
    console.log("Producto seleccionado:", elem);
    setEnabled(true)
    onCurrentItem((prev) => ({
      ...prev,
      product_name: elem.name,
      product_id: elem.id,
      sku: elem.sku,
      brand: elem.brand,
      stock: elem.stock,
      weight: elem.weight
    }))
    console.log("Producto seleccionado:", currentItem);
  }

  const handleProduct = (mode) => {
    setEnabled(mode === 'select' ? false : true)
    setProductMode(mode)
    setStep(
      mode == "select" ?
        page.PRODUCT_TABLE :
        page.PRODUCT
    )
  }



  const modeActions = useMemo(() => {
    switch (modalMode) {
      case CRUD.CREATE: return "Crear"
      case CRUD.UPDATE: return "Actualizar"
      case CRUD.READ: return "Salir"
      case CRUD.DELETE: return "Eliminar"
    }
  }, [modalMode])



  useEffect(() => {
    console.log(currentItem)
  }, [currentItem])

  return (
    <Modal size="md" fullscreen="md-down" backdrop="static" show={showModal} onHide={handleCloseModal} centered>
      <Modal.Body>
        <Form>

          {step == page.START && modalMode == CRUD.CREATE && (
            <div className="w-100 py-5 d-flex justify-content-spacebetween">
              <div>
                <p className="h2">Crea una publicacion</p>
                <p className="my-4">Puedes crear una publicacion rapidamente usando el <b>mismo producto</b> de otra o creando un nuevo producto</p>
              </div>
              <div>
                <img className="ps-3" src={Img0} alt="" />
              </div>
            </div>
          )}

          {step == page.START && modalMode == CRUD.READ &&
            (
              <div className="w-100 py-5 d-flex justify-content-spacebetween">
                <div>
                  <p className="h2">Visualizar publicacion</p>
                  <p className="my-4">Puedes visualizar rapidamente una publicacion para ver producto, precio, ficha tecnica de la misma.</p>
                </div>
                <div>
                  <img className="ps-3" src={Img2} alt="" />
                </div>
              </div>
            )}

          {step == page.START && modalMode == CRUD.UPDATE &&
            (
              <div className="w-100 py-5 d-flex justify-content-spacebetween">
                <div>
                  <p className="h2">Editar publicacion</p>
                  <p className="my-4">Puedes actualizar rapidamente una publicacion. Edita producto, precio, ficha tecnica de la misma.</p>
                </div>
                <div>
                  <img className="ps-3" src={Img3} alt="" />
                </div>
              </div>
            )}

          {step === page.PUBLICATION && (
            <>
              <p className="h5 my-4">Publicacion</p>

              <Form.Group className="my-3" controlId="formName">
                <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                  <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                    Titulo
                  </InputGroup.Text>
                  <Form.Control
                    style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                    className="border-0 no-arrows"
                    spellCheck="false"
                    type="text"
                    placeholder="Ingrese nombre"
                    name="title"
                    value={currentItem.title}
                    onChange={handleChange}
                    disabled={modalMode == CRUD.READ}
                  />
                  
                  <InputGroup.Text className="fw-semibold border-0 text-muted px-3" style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)' }}>
                      <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <div className="shadow-sm border rounded overflow-hidden">
                  <div
                    className="fw-semibold bg-light border-bottom text-muted px-3 py-2"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Description
                  </div>
                  <Form.Control
                    spellCheck="false"
                    as="textarea"
                    rows={7}
                    placeholder="Ingrese descripción"
                    name="description"
                    className="border-0 rounded-0" // Quitamos bordes y redondeado interno
                    value={currentItem.description}
                    onChange={handleChange}
                    disabled={modalMode === CRUD.READ}
                    style={{ boxShadow: 'none' }} // Evita el brillo azul doble al hacer foco
                  />
                </div>
              </Form.Group>
            </>
          )}

          {step == page.PRODUCT_START &&
            <>
              <div className="w-100 py-5 d-flex justify-content-spacebetween">
                <div>
                  <p className="h4">Producto</p>
                  <p className="my-2">Puedes <b>seleccionar</b> un producto que ya publicaste rapidamente o <b>crear</b> un nuevo producto</p>

                  <div className="py-3">
                    <Button onClick={() => handleProduct("select")} className="me-3 mb-2" variant="secondary">
                      <i class="bi bi-check2-square"></i>
                      <span className="ms-2"> Elegir producto </span>
                    </Button>
                    <Button className="me-3 mb-2" onClick={() => handleProduct("create")}>
                      <i class="bi bi-plus-circle"></i>
                      <span className="ms-2"> Crear producto </span>
                    </Button>
                  </div>

                </div>
                <div>
                  <img className="ps-3" src={Img1} alt="" />
                </div>

              </div>
            </>
          }

          {step == page.PRODUCT_TABLE && (
            <ProductSelectTable handleProduct={handleSelectProduct} >
              <p className='h5 mb-4'>
                Selecciona un Producto
              </p>
            </ProductSelectTable>
          )}

          {step == page.PRODUCT &&
            (<>

              {/* Producto */}

              <p className="h5 my-4">Producto</p>

              <>
                <Form.Group className="mb-3" controlId="formNameProduct">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Nombre
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      spellCheck="false"
                      type="text"
                      placeholder="Ingrese nombre"
                      name="product_name"
                      value={currentItem.product_name}
                      onChange={handleChange}
                      // readOnly={productMode == "select"}
                      disabled={productMode == "select" || modalMode == CRUD.READ}
                    />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Form.Group controlId="formBrandProduct">
                    <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                      <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                        Marca
                      </InputGroup.Text>
                      <Form.Control
                        style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                        className="border-0 no-arrows"
                        spellCheck="false"
                        type="text"
                        placeholder="Ingrese marca"
                        name="brand"
                        value={currentItem.brand}
                        onChange={handleChange}
                        disabled={productMode == "select" || modalMode == CRUD.READ}
                      />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formSkuProduct">
                    <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                      <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                        sku
                      </InputGroup.Text>
                      <Form.Control
                        style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                        className="border-0 no-arrows"
                        spellCheck="false"
                        type="text"
                        placeholder="Ingrese sku"
                        name="sku"
                        value={currentItem.sku}
                        onChange={handleChange}
                        disabled={productMode == "select" || modalMode == CRUD.READ}
                      />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)' }}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                </div>
                <div className="d-flex gap-2">
                  <Form className="mt-3" controlId="formStockProducto">
                    <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                      <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                        Stock
                      </InputGroup.Text>
                      <Form.Control
                        style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                        className="border-0 no-arrows"
                        type="number"
                        rows={3}
                        placeholder="Ingrese stock"
                        name="stock"
                        value={currentItem.stock}
                        disabled={productMode == "select" || modalMode == CRUD.READ}
                        onChange={handleChange}
                      />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                    </InputGroup>
                  </Form>
                  <Form className="mt-3" controlId="formStockProducto">
                    <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                      <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                        Peso
                      </InputGroup.Text>
                      <Form.Control
                        style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                        className="border-0 no-arrows"
                        type="number"
                        rows={3}
                        placeholder="Ingrese peso"
                        name="weight"
                        value={currentItem.weight}
                        onChange={handleChange}
                        disabled={productMode == "select" || modalMode == CRUD.READ}
                      />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                    </InputGroup>
                  </Form>
                </div>
              </>


              <div className="my-3 d-flex gap-2">
                <Form className="mb-3" controlId="formPrice">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Precio
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      type="number"
                      rows={3}
                      placeholder="Ingrese un precio"
                      name="price"
                      value={currentItem.price}
                      onChange={handleChange}
                      disabled={modalMode == CRUD.READ}
                    />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                  </InputGroup.Text>
                  </InputGroup>
                </Form>

                <Form className="mb-3" controlId="formPrice">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Descuento
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      type="number"
                      rows={3}
                      placeholder="Ingrese un Valor"
                      name="discountPercentage"
                      value={currentItem.discountPercentage}
                      onChange={handleChange}
                      disabled={modalMode == CRUD.READ}
                    />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              </div>
              <Form.Group controlId="formBrandProduct">
                <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                  <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                    Categoria
                  </InputGroup.Text>
                  <Form.Control
                    style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                    className="border-0 no-arrows"
                    spellCheck="false"
                    type="text"
                    placeholder="Ingrese categoria"
                    name="category"
                    value={currentItem.category}
                    onChange={handleChange}
                    disabled={productMode == "select" || modalMode == CRUD.READ}
                  />
                    <InputGroup.Text 
                        className="fw-semibold border-0 text-muted px-3" 
                        style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                        <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
                    </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </>

            )}
          {step === page.DETAILS && (<>

            {/* Detalles */}

            <h5 className="my-3">Detalles</h5>

            <Form.Group className="mb-3" controlId="formName">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  Garantia
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  spellCheck="false"
                  type="text"
                  placeholder="Ingrese nombre"
                  name="warrantyInformation"
                  value={currentItem.warrantyInformation}
                  onChange={handleChange}
                  disabled={modalMode == CRUD.READ}
                />
                <InputGroup.Text 
                    className="fw-semibold border-0 text-muted px-3" 
                    style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                    <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
               </InputGroup.Text> 
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  Envio
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  spellCheck="false"
                  type="text"
                  placeholder="Ingrese nombre"
                  name="shippingInformation"
                  value={currentItem.shippingInformation}
                  onChange={handleChange}
                  disabled={modalMode == CRUD.READ}
                />
                <InputGroup.Text 
                    className="fw-semibold border-0 text-muted px-3" 
                    style={{ fontSize: "0.95rem", backgroundColor: 'rgb(233 236 239)'}}>
                    <i class="bi bi-pencil" style={{opacity: '.6'}}></i>
               </InputGroup.Text> 
              </InputGroup>
            </Form.Group>
          </>
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
            {step < 5 && (
              <Button
                disabled={step == 2 && modalMode != CRUD.READ ||
                  step == page.PRODUCT_TABLE && !enabled
                } variant="outline-secondary" onClick={handleNext}>
                Continuar <i className={`bi bi-chevron-right`}></i>
              </Button>
            )}

            {step == 5 && (
              <>
                <Button
                  variant="primary"
                  onClick={
                    modalMode === CRUD.CREATE && handleCreate ||
                    modalMode === CRUD.UPDATE && handleUpdate ||
                    modalMode === CRUD.READ && handleCloseModal }
                  disabled={!currentItem.title || !currentItem.description}
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

