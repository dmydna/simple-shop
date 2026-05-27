import { useNavigate } from "react-router-dom";
import {Form, Button, Container, Alert, Card, Row} from "react-bootstrap";
import React, { useContext, useState } from "react";
import { useAuth } from "../features/auth/hooks/AuthContext.jsx";
import LoginForm from "../features/auth/components/LoginForm.jsx";
import RegisterForm from "../features/auth/components/RegisterForm.jsx";


export default function Register(){


    return (
        <Container fluid="xl">
            <Row>
                <RegisterForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <p className="fs-4 m-0">Registrarse</p>
                    </div>
                </RegisterForm>
            </Row>
        </Container>
    )


}

