import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export default function Register(){

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(user, pass)) {
          navigate("/dashboard");
        } else {
          setError("Usuario o contraseña inválidos");
        }
      };



    return (
        <Container className="my-5" style={{maxWidth: 400, minWidth:300}}>
            <h2>Registrar</h2>
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
                <Button variant="primary" type="submit" className="w-100 my-2" >Entrar</Button>
                <Button variant="success" className="w-100 my-2" >Registrar</Button>
            </Form>
        </Container>
    )


}

