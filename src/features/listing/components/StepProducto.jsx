import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useListingsForm } from "../hooks/ListingFormContext.jsx";
import { CRUD } from "../../../utils/crud.js";


function StepProductos({children, className}){

    const {currentItem, handleChange, modalMode, isDisabledField, handleEnableEdit, editableFields} = useListingsForm();

    return (
        <>
            {/* Producto */}

            {children}
            
            <>
              <Form.Group className={`mb-3 ${className || ''}`} controlId="formNameProduct">
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
                    name="productName"
                    value={currentItem.productName || undefined}
                    onChange={handleChange}
                    disabled={isDisabledField("productName", true)}
                    />
                    {modalMode != CRUD.CREATE &&
                     modalMode != CRUD.UPDATE && (
                    <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["productName"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("productName")}
                  >
                    <i className={`bi ${editableFields["productName"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                    )}

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
                      disabled={isDisabledField("brand", true)}
                      />
                      {modalMode != CRUD.CREATE &&
                       modalMode != CRUD.UPDATE && (
                      <InputGroup.Text
                      className="fw-semibold border-0 text-muted px-3"
                      style={{
                        fontSize: "0.95rem", 
                        backgroundColor: 'rgb(233, 236, 239)', 
                        cursor: editableFields["brand"] ? 'default' : 'pointer'
                      }}
                      onClick={() => handleEnableEdit("brand")}
                    >
                      <i className={`bi ${editableFields["brand"] ? "bi-check text-primary" : "bi-pencil"}`}
                        style={{ opacity: '.8' }}>
                      </i>
                    </InputGroup.Text>
                      )}

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
                      disabled={isDisabledField("sku", true)}
                      />

                      {modalMode != CRUD.CREATE &&
                       modalMode != CRUD.UPDATE && (
                      <InputGroup.Text
                        className="fw-semibold border-0 text-muted px-3"
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["sku"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("sku")}
                      >
                        <i className={`bi ${editableFields["sku"] ? "bi-check text-primary" : "bi-pencil"}`}
                            style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                    </InputGroup>
                </Form.Group>

              </div>
              <div className="d-flex gap-2 mb-3">

              <Form.Group className="mt-3" controlId="formStockProducto">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Stock
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      type="number"
                      rows={3}
                      placeholder="Ingrese peso"
                      name="stock"
                      value={currentItem.stock}
                      onChange={handleChange}
                      disabled={isDisabledField("stock", true)}
                      />
                      {modalMode != CRUD.CREATE &&
                       modalMode != CRUD.UPDATE && (
                      <InputGroup.Text
                        className={`${modalMode == CRUD.CREATE ? 'd-none' : ''} fw-semibold border-0 text-muted px-3`}
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["stock"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("stock")}
                      >
                        <i className={`
                        bi ${editableFields["stock"] ? "bi-check text-primary" : "bi-pencil"}`}
                          style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formWeightProducto">
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
                      disabled={isDisabledField("weight", true)}
                      />
                      {modalMode != CRUD.CREATE &&
                       modalMode != CRUD.UPDATE && (
                      <InputGroup.Text
                        className={`${modalMode == CRUD.CREATE ? 'd-none' : ''} fw-semibold border-0 text-muted px-3`}
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["weight"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("weight")}
                      >
                        <i className={`
                        bi ${editableFields["weight"] ? "bi-check text-primary" : "bi-pencil"}`}
                          style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                  </InputGroup>
                </Form.Group>
              </div>
            </>

            <Form.Group  className="mb-3" controlId="formBrandCategory">
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
                  disabled={isDisabledField("category", true)}
                  />
                  {modalMode != CRUD.CREATE &&
                   modalMode != CRUD.UPDATE && (
                  <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["category"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("category")}
                  >
                    <i className={`bi ${editableFields["category"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                  )}
              </InputGroup>
            </Form.Group>
            
            {modalMode == CRUD.UPDATE && <hr  style={{opacity: '.2'}}/>}  
            
            <div className="my-3 d-flex gap-2">
              <Form.Group className="mb-3" controlId="formPrice">
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
                    disabled={isDisabledField("price")}
                    />
                    {modalMode != CRUD.CREATE && (
                    <InputGroup.Text
                      className="fw-semibold border-0 text-muted px-3"
                      style={{
                        fontSize: "0.95rem", 
                        backgroundColor: 'rgb(233, 236, 239)', 
                        cursor: editableFields["price"] ? 'default' : 'pointer'
                      }}
                      onClick={() => handleEnableEdit("price")}
                    >
                      <i className={`bi ${editableFields["price"] ? "bi-check text-primary" : "bi-pencil"}`}
                        style={{ opacity: '.8' }}>
                      </i>
                    </InputGroup.Text>
                    )}
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDiscountPercentage">
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
                    disabled={isDisabledField("discountPercentage")}
                    />
                    {modalMode != CRUD.CREATE && (
                    <InputGroup.Text
                      className="fw-semibold border-0 text-muted px-3"
                      style={{
                        fontSize: "0.95rem", 
                        backgroundColor: 'rgb(233, 236, 239)', 
                        cursor: editableFields["discountPercentage"] ? 'default' : 'pointer'
                      }}
                      onClick={() => handleEnableEdit("discountPercentage")}
                    >
                      <i className={`bi ${editableFields["discountPercentage"] ? "bi-check text-primary" : "bi-pencil"}`}
                        style={{ opacity: '.8' }}>
                      </i>
                    </InputGroup.Text>
                    )}
                </InputGroup>
              </Form.Group>
            </div>

          </>
    )
}
export default StepProductos