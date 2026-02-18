import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useListingsForm } from "../hooks/ListingFormContext.jsx";
import { CRUD } from "../../../utils/crud.js";

function StepDetalles({children, className}){

    const {currentItem, handleChange, modalMode,
    isDisabledField, editableFields, handleEnableEdit} = useListingsForm();

    return (
        <>
            {/* Detalles */}
            {children}
            <Form.Group className={`mb-3 ${className || ''}`} controlId="formWarrantyInformation">
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
                  disabled={isDisabledField("warrantyInformation")}
                  />
                  {modalMode != CRUD.CREATE && (
                  <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["warrantyInformation"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("warrantyInformation")}
                  >
                    <i className={`bi ${editableFields["warrantyInformation"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                  )}
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formShippingInformation">
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
                  disabled={isDisabledField("shippingInformation")}
                  />
                  {modalMode != CRUD.CREATE && (
                  <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["shippingInformation"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("shippingInformation")}
                  >
                    <i className={`bi ${editableFields["shippingInformation"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                  )}
              </InputGroup>
            </Form.Group>
          </>
    )
}


export default StepDetalles;