import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useListingsForm } from "../../../contexts/ListingFormContext";
import { CRUD } from "../../../enums/crudUtils";


function StepPublicacion({children}) {

    const { currentItem, handleChange, modalMode, isDisabledField, editableFields,  handleEnableEdit } = useListingsForm()
    return (
        <>
            {children}

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
                        rows={7}
                        placeholder="Ingrese descripción"
                        name="description"
                        className="border-0 rounded-0" // Quitamos bordes y redondeado interno
                        value={currentItem.description}
                        onChange={handleChange}
                        disabled={isDisabledField("description")}
                        style={{ boxShadow: 'none' }} // Evita el brillo azul doble al hacer foco
                    />
                </div>
            </Form.Group>
        </>
    )
}
export default StepPublicacion