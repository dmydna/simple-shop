import React, { useEffect } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm.js";
import { useAuthContext } from "@f/auth/contexts/AuthContext.jsx";
import FetchState from "@/components/common/FetchState";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { URL_USER_HOME } from "@/utils/links";
import PublicRoute from "@/components/common/PublicRoute";


function ChangeMailForm({ children, style, className }) {

    const { loading, error, changeEmail, setReset, fetchStatus } = useAuthContext();
    const { onChange, formData } = useForm()

 
    useEffect(()=>{
        setReset(true)
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await changeEmail(formData)
    };

    return (
        <PublicRoute>
            <Col className={`${className} mx-auto`} style={style}>
            <FetchState 
                to={URL_USER_HOME}
                hook={fetchStatus} >
                {children}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            value={formData.password}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nuevo correo electronico</Form.Label>
                        <Form.Control
                            type="email"
                            name="newEmail"
                            placeholder="Ingrese email"
                            value={formData.newEmail}
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

                        : <Button variant="primary" type="submit" className="w-100 my-2" >
                            Confirmar
                        </Button>
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


export default ChangeMailForm;
