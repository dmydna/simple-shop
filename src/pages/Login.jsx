import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import LoginForm from "../components/login/LoginForm";


function Login(){

    const {token, user, isAuth} = useAuth()
    
    const navigate = useNavigate()
    useEffect(() => {
        const scrollX = (document.body.scrollWidth - window.innerWidth) / 2;
        const scrollY = (document.body.scrollHeight - window.innerHeight) / 2;
        window.scrollTo({top: 0});
    }, []);


    if(isAuth) navigate('/user/');

    return (
    <Container fluid="xl">
     <Row>
        <LoginForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
             <div className="d-flex align-items-center justify-content-between mb-4">
                <p className="fs-3 m-0">Iniciar sesión</p>
            </div>
        </LoginForm>
     </Row>
    </Container>
    )
}

export default Login;

