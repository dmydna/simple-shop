import { Container, Row } from "react-bootstrap";
import React from "react";

import LoginForm from "@f/auth/components/LoginForm.jsx";


function Login(){

    return (
    <Container fluid="xl">
     <Row>
        <LoginForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
             <div className="d-flex align-items-center justify-content-between mb-4">
                <p className="fs-4 m-0">Iniciar sesión</p>
            </div>
        </LoginForm>
     </Row>
    </Container>
    )
}

export default Login;

