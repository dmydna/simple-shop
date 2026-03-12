import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useListingCrud } from "../contexts/ListingCrudContext.jsx";
import { CRUD } from "../../../utils/crud.js";


function FormBasic({children, className}) {

    const { dataItem, handleChange, modalMode,
        isDisabledField, editableFields,  handleEnableEdit } = useListingCrud()

    return (
        <>
            {children}
            <Form.Group className={`my-3 ${className || ''}`} controlId="formName">
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
                        value={dataItem.title}
                        onChange={handleChange}
                        disabled={isDisabledField("title")}
                    />
                    {modalMode !== CRUD.CREATE && (
                        <InputGroup.Text
                            className="fw-semibold border-0 text-muted px-3"
                            style={{
                                fontSize: "0.95rem",
                                backgroundColor: 'rgb(233, 236, 239)',
                                cursor: editableFields["title"] ? 'default' : 'pointer'
                            }}
                            onClick={() => handleEnableEdit("title")}
                        >
                            <i className={`bi ${editableFields["title"] ? "bi-check text-primary" : "bi-pencil"}`}
                                style={{ opacity: '.8' }}>
                            </i>
                        </InputGroup.Text>
                    )}

                </InputGroup>
            </Form.Group>

            <div className="my-1 d-flex gap-2">
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
                            value={dataItem.price}
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
                            value={dataItem.discountPercentage}
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

            <Form.Group className="mb-3" controlId="formDescription">
                <div className="shadow-sm border rounded overflow-hidden">
                    <div className="d-flex justify-content-between bg-light border-bottom text-muted">
                        <span className="fw-semibold px-3 py-2" style={{ fontSize: "0.95rem" }}>
                            Descripcion
                        </span>
                        {modalMode != CRUD.CREATE && (
                            <span
                                className="fw-semibold border-0 text-muted px-3 py-2"
                                style={{
                                    fontSize: "0.95rem",
                                    cursor: editableFields["description"] ? 'default' : 'pointer'
                                }}
                                onClick={() => handleEnableEdit("description")}>
                                <i className={`bi ${editableFields["description"] ? "bi-check text-primary" : "bi-pencil"}`}
                                    style={{ opacity: '.8' }}>
                                </i>
                            </span>
                        )}
                    </div>

                    <Form.Control
                        spellCheck="false"
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese descripción"
                        name="description"
                        className="border-0 rounded-0" // Quitamos bordes y redondeado interno
                        value={dataItem.description}
                        onChange={handleChange}
                        disabled={isDisabledField("description")}
                        style={{ boxShadow: 'none' }} // Evita el brillo azul doble al hacer foco
                    />
                </div>
            </Form.Group>




        </>
    )
}
export default FormBasic