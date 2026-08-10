import { Container, Row } from "react-bootstrap";
import React from "react";
import ChangeMailForm from "../features/auth/components/ChangeMailForm.jsx";


function ChangeMail(){

    return (
    <Container fluid="xl">
     <Row>
        <ChangeMailForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
             <div className="d-flex align-items-center gap-3 mb-4">
                <i className="bi bi-envelope fs-4"></i>
                <p className="fs-4 m-0">Cambiar correo electronico</p>
            </div>
        </ChangeMailForm>
     </Row>
    </Container>
    )
}

export default ChangeMail;

