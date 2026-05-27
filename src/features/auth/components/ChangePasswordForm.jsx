import React, { useState, useEffect } from "react";
import {Alert, Button, Col, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useUIContext } from "../../../contexts/UIContext.jsx";
import {useForm} from "../../../hooks/useForm.js";


function ChangePasswordForm({ children, style, className}){

    const { setShowLoginModal} = useUIContext()
    const { login, loading, error,  setReset, changePassword } = useAuth();
    const { onChange, formData} = useForm()

    const navigate = useNavigate();
 
    const handleSubmit = async  (e) =>{
        e.preventDefault();
        await changePassword(formData)
        navigate("/user")
   };


    return (
        <Col className={`${className} mx-auto`} style={style}>
                {children}
            <Form  onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="oldPassword"
                        placeholder="Ingrese contraseña"
                        value={formData.oldPassword}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="newPassword"
                        placeholder="Ingrese contraseña"
                        value={formData.newPassword}
                        onChange={onChange}
                    />
                </Form.Group>
                <div className={`${error ? 'opacity-100' : 'opacity-0'}`} >
                    <Alert variant="danger">{error}</Alert>
                </div>

                {loading ?
                    <Button variant="primary"  className="w-100 position-relative my-2 " disabled>
                        <div style={{scale: ".8", left: "10px", top: "1px" }}
                             className="spinner-border text-white scale-50 position-absolute" role="status"
                        >
                        </div>
                        Cargando...
                    </Button>

                    : <Button variant="primary" type="submit" className="w-100 my-2" >Confirmar</Button>
                }

                <div className="d-flex justify-content-center m-2">
                   <p className="me-2">¿Olvidaste tu contraseña?</p>
                    <Link to={"/faqs"}>
                        <p className="text-primary fw-bold">Restaurar</p>
                    </Link>
                </div>

            </Form>
        </Col>
    )


}


export default ChangePasswordForm;
