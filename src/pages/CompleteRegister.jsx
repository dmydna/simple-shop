import {Container, Row} from "react-bootstrap";
import React, {  } from "react";
import CompleteRegisterForm from "@/features/auth/components/CompleteRegisterForm.jsx";


export default function CompleteRegister(){


    return (
        <Container fluid="xl">
            <Row>
                <CompleteRegisterForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <p className="fs-4 m-0">Completar Registro</p>
                    </div>
                </CompleteRegisterForm>
            </Row>
        </Container>
    )


}

