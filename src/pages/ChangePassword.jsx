import { Container, Row } from "react-bootstrap";
import React from "react";
import ChangePasswordForm from "../features/auth/components/ChangePasswordForm.jsx";


function ChangePassword(){

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

