import {Container, Row} from "react-bootstrap";
import React, {  } from "react";
import CompleteRegisterForm from "@/features/auth/components/CompleteRegisterForm.jsx";
import PageFormLayout from "@/components/layout/PageFormLayout";


export default function CompleteRegister(){

    return (
        <PageFormLayout>
            <CompleteRegisterForm className={'bg-light rounded p-4 p-md-5'} style={{maxWidth: 500}}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <p className="fs-4 m-0">Completar Registro</p>
                </div>
            </CompleteRegisterForm>
        </PageFormLayout>
    )


}

