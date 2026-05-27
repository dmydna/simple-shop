import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../features/auth/hooks/AuthContext.jsx";
import ChangePasswordForm from "../features/auth/components/ChangePasswordForm.jsx";


function ChangePassword(){

    const {token, user, isAuth} = useAuth()
    
    const navigate = useNavigate()
    useEffect(() => {
        const scrollX = (document.body.scrollWidth - window.innerWidth) / 2;
        const scrollY = (document.body.scrollHeight - window.innerHeight) / 2;
        window.scrollTo({top: 0});
    }, []);



    return (
    <Container fluid="xl">
     <Row>
        <ChangePasswordForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
             <div className="d-flex align-items-center justify-content-between mb-4">
                <p className="fs-4 m-0">Change Password</p>
            </div>
        </ChangePasswordForm>
     </Row>
    </Container>
    )
}

export default ChangePassword;

