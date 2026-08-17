import React, { useEffect } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@hooks/useForm.js";
import { useAuthContext } from "@f/auth/contexts/AuthContext.jsx";
import PublicRoute from "@/components/common/PublicRoute";
import FetchState from "@/components/common/FetchState";
import ProtectedRoute from "@/components/common/ProtectedRoute";


function ChangePasswordForm({ children, style, className }) {

    const { loading, error, changePassword, fetchStatus } = useAuthContext();
    const { onChange, formData } = useForm()

    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        await changePassword(formData)
    };


    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;
        main.classList.add("d-flex");
        return () => {
            main.classList.remove("d-flex");
        };
    }, []);


    return (
        <PublicRoute>
            <Col className={`${className} mx-auto my-auto`} style={style}>
            <FetchState hook={fetchStatus} to={"/user"}>
                {children}
                <Form onSubmit={handleSubmit}>
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
                        <Button variant="primary" className="w-100 position-relative my-2 " disabled>
                            <div style={{ scale: ".8", left: "10px", top: "1px" }}
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
            </FetchState>
            </Col>
        </PublicRoute>
    )


}


export default ChangePasswordForm;
