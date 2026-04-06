import { useNavigate } from "react-router-dom";
import {Form, Button, Container, Alert, Card, Row} from "react-bootstrap";
import React, { useContext, useState } from "react";
import { useAuth } from "../features/auth/hooks/AuthContext.jsx";
import LoginForm from "../features/auth/components/LoginForm.jsx";
import RegisterForm from "../features/auth/components/RegisterForm.jsx";
import CompleteRegisterForm from "@/features/auth/components/CompleteRegisterForm.jsx";


export default function CompleteRegister(){


    return (
        <Container fluid="xl">
            <Row>
                <CompleteRegisterForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <p className="fs-3 m-0">Completar Registro</p>
                    </div>
                </CompleteRegisterForm>
            </Row>
        </Container>
    )


}

