
import { CompleteUserRegister } from "@/utils/schemas";
import PageLoading from "@features/fallback/PageLoading";
import { useProfile } from "@features/profile/contexts/ProfileContext.jsx";
import { Button, Col, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CRUD } from '@/utils/enums';
import InputFloating from "@/components/common/InputFloating";
import FetchStateToast from "@/components/common/FetchStateToast";
import FormProfile from "@/features/profile/components/FormProfile";
import PublicRoute from "@/components/common/PublicRoute";
import ProtectedRoute from "@/components/common/ProtectedRoute";


function CompleteRegisterForm({ children, className, style }) {

    const navigate = useNavigate();

    const { profile, updatePerfil, loading, setError, error, success, setSuccess } = useProfile()

    const { reset, register, handleSubmit, formState: { errors } } 
        = useForm({ 
            resolver: zodResolver(CompleteUserRegister), 
            defaultValues: profile,
            // mode: 'onTouched', 
            // reValidateMode: 'onChange'
        });

    useEffect(() => {
        // setea valores iniciales
        reset(profile)
    }, [profile])

    const onSubmit = async (data) => {
        await updatePerfil(data)
    };


    return (
        
        <PublicRoute>
            <Col className={`${className} mx-auto`} style={{ ...style, minHeight: '400px' }}>

                <FetchStateToast
                    hook={{ loading, error, setError, success, setSuccess }}
                >
                    <>
                        {children}

                        <FormProfile 
                            id={"informationPerfilForm"} 
                            submit={handleSubmit(onSubmit)} 
                            formHook={{ errors, register }}
                        />

                        <Button 
                            className="w-100 my-2"
                            form='informationPerfilForm' 
                            variant="primary" 
                            type="submit"
                        > 
                            Actualizar
                        </Button>
                    </>    
                </FetchStateToast>

            </Col>
        </PublicRoute>

    )

}
export default CompleteRegisterForm;
