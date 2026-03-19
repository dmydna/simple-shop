import {Alert, Button, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
import {useForm} from "../../contexts/useForm.js";

export const FormCreater = ({ objeto, children, onSubmit, className, style }) => {

    // Inicializamos el hook. Importante: objeto debe ser el estado inicial.
    const { formData, onChange, onResetForm, setFormData } = useForm(objeto);

    // Función de ayuda para determinar el tipo de input basado en el valor inicial
    const getTypeOfInput = (key) => {
        const initialValue = objeto[key];
        if (typeof initialValue === "boolean") return "switch";
        if (typeof initialValue === "number") return "number";
        return "text";
    };

    const formatLabel = (text) => {
        return text
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase();
    };


    const handleClear = (e) => {
        e.preventDefault();
        // Creamos un objeto con las mismas llaves pero valores vacíos
        const emptyState = Object.keys(objeto).reduce((acc, key) => {
            acc[key] = typeof objeto[key] === "boolean" ? false : "";
            return acc;
        }, {});
        setFormData(emptyState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Col className={`${className} mx-auto`} style={style}>
            {children}
            <Form onSubmit={handleSubmit}>
                {Object.entries(formData).map(([key, value]) => {
                    const type = getTypeOfInput(key);

                    return (
                        <Form.Group className="mb-3" key={key}>
                            <Form.Label className="text-capitalize fw-bold">
                                {formatLabel(key)}
                            </Form.Label>

                            {type === "switch" ? (
                                <Form.Check
                                    type="switch"
                                    id={`switch-${key}`}
                                    name={key}
                                    label={value ? "Si" : "No"}
                                    checked={!!value} // Forzamos booleano
                                    onChange={onChange}
                                />
                            ) : (
                                <Form.Control
                                    type={type}
                                    name={key}
                                    placeholder={`Ingrese ${formatLabel(key)}`}
                                    value={value || ''} // Evita el error de "uncontrolled to controlled"
                                    onChange={onChange}
                                />
                            )}
                        </Form.Group>
                    );
                })}

                <Button variant="primary" type="submit" className="w-100 mt-3 shadow-sm">
                    Guardar Cambios
                </Button>

                <div className="d-flex justify-content-center align-items-center mt-3 small">
                    <span className="text-muted">¿Deshacer cambios?</span>
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-2 text-decoration-none fw-bold"
                        onClick={onResetForm}
                    >
                        Resetear
                    </Button>
                    <span className="mx-2 text-muted">o</span>
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none fw-bold text-danger"
                        onClick={handleClear}
                    >
                        Limpiar
                    </Button>
                </div>
            </Form>
        </Col>
    );
};