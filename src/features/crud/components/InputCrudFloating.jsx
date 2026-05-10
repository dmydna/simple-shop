import CopyButton from "@/components/common/CopyButton";
import LockButton from "@/components/common/LockButton";
import { CRUD } from "@utils/crud.js";
import { useEffect } from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";


function InputCrudFloating({ name, label, type, placeholder, as, rows, useHookCrud }) {

    const { formData, handleChange, crudMode,
        isDisabledField, editableFields, handleEnableEdit } = useHookCrud()


    useEffect(() => { console.log("formadata desde input", formData) }, [formData])

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

                {crudMode == CRUD.UPDATE && (
                    <LockButton
                        style={{ top: 11, right: 3, opacity: '.7' }}
                        className="pointer position-absolute"
                        locked={editableFields[name]}
                        handle={() => handleEnableEdit(name)}
                    />
                )}
                {crudMode === CRUD.READ && (
                    <CopyButton
                        style={{ top: 10, right: 3, opacity: '.7' }}
                        className="pointer position-absolute"
                        showMessage={false}
                        value={formData?.[name]}
                    />

                )}
            </FloatingLabel>
        </Form.Group>
    )
}

export default InputCrudFloating
