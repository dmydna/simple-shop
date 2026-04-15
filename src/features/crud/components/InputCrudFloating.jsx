import { CRUD } from "@utils/crud.js";
import { useEffect } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";


function InputCrudFloating({ name, label, type, placeholder, as, rows,useHookCrud }) {

    const { formData, handleChange, modalMode,
        isDisabledField, editableFields, handleEnableEdit } = useHookCrud()

    
    useEffect(()=>{console.log("formadata desde input", formData)},[formData])

    return (
        <Form.Group className="w-100">
            <FloatingLabel
                controlId={`floating-${name}`}
                label={label || name || ''}
                className="mb-3"
            >
                <Form.Control
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder || `Ingrese ${name}`}
                    value={formData?.[name] || ""}
                    onChange={handleChange}
                    disabled={isDisabledField(name)}
                    spellCheck="false"
                    style={as == "textarea" ? { minHeight: '100px', resize: 'vertical' } : {}}
                    as={as || "input"}
                    rows={rows || 8}
                />
                {modalMode !== CRUD.CREATE && (
                    <InputGroup.Text
                        className="btn-input-edit fw-semibold border-0 text-muted px-3 position-absolute"
                        style={{
                            top: "10px",
                            right: "0",
                            fontSize: "0.95rem",
                            backgroundColor: 'transparent',
                            cursor: editableFields[name] ?
                                'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit(name)}
                    >
                        <i  style={{ opacity: '.8' }}
                            className={`${editableFields[name] ?
                                "bi bi-check text-primary" : "bi bi-pencil"}`}
                        >
                        </i>
                    </InputGroup.Text>
                )}
            </FloatingLabel>
        </Form.Group>
    )
}

export default InputCrudFloating
