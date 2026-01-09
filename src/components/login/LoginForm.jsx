import React, { useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useUIContext } from "../../contexts/UIContext";


 function LoginForm({ children, style, className}){


    const {showLogin, onHideLogin} = useUIContext()

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => 
        {
        console.log('click')
        e.preventDefault();
        if (login(user, pass)) 
          {
          navigate("/perfil/admin");
          onHideLogin(false)

        } else {
          setError("Usuario o contraseña inválidos");
        }
      };

    return (
        <Col className={`${className} mx-auto`} style={style}>
                {children}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form  onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese contraseña"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 my-2" >
                      Acceder
                </Button>
                <div className="d-flex justify-content-center m-2">
                   <p className="me-2">¿Aun no tienes una cuenta?</p>
                   <p className="text-primary fw-bold">Registrarme</p>
                </div>

            </Form>
        </Col>
    )


}


export default LoginForm;