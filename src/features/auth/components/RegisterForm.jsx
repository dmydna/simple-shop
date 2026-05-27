import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useUIContext } from "../../../contexts/UIContext.jsx";
import {useForm} from "../../../hooks/useForm.js";


function RegisterForm({ children, style, className}){

    const navigate = useNavigate();
    const { showRegisterModal, setShowRegisterModal } = useUIContext()
    const [ registerSuccess,  setRegisterSuccess ] = useState(false);
    const { login, loading, error,  register, handleChange, userData, setReset } = useAuth();
    const { onChange, formData} = useForm()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
        //navigate("/user/information");
        setRegisterSuccess(true);
    }

    const autoLogin = async () => {
        const {username, password} = formData;
        await login({username, password});
        navigate("/register/complete");
    }
    
    useEffect( () => { 
       if(registerSuccess){
         autoLogin(formData)
       } 
    } ,[registerSuccess])

    return (
        <Col className={`${className} mx-auto`} style={ {...style, minHeight: '400px'}}>
            {!registerSuccess && children}
            {registerSuccess ? (
              <div 
                 className="d-flex flex-column align-items-center justify-content-center w-100 h-100 my-2">
               <div 
                  style={{ left: "10px", top: "1px" }}
                  className="spinner-border text-primary" 
                  role="status"
               ></div> 
                 <p className="my-3">
                   Iniciando sesion... 
                 </p>
              </div>

             ):(  
            <Form  onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese usuario"
                        name="username"
                        value={formData?.username || ''}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese contraseña"
                        name="password"
                        value={formData?.password || ''}
                        onChange={onChange}
                    />
                </Form.Group>
               {!registerSuccess && (
                <div className={`${error ? 'opacity-100' : 'opacity-0'}`} >
                    <Alert variant="danger">{error}</Alert>
                </div>
                )}

                {loading ? 
                  <Button variant="dark"  className="w-100 position-relative my-2 " disabled>
                     <div 
                        style={{scale: ".8", left: "10px", top: "1px" }}
                        className="spinner-border text-white scale-50 position-absolute" 
                        role="status"
                     ></div> 
                        Cargando...
                  </Button> :
                  <Button variant="outline-success" type="submit" className="w-100 my-2" >
                     Registrar
                  </Button> 
                 }

                <div className="d-flex justify-content-center m-2">
                    <p className="me-2">¿Ya tienes una cuenta?</p>
                    <Link to={"/login"}>
                        <p className="text-primary fw-bold">Iniciar Session</p>
                    </Link>
                </div>
            </Form>
             )}
            
        </Col>
    )


}


export default RegisterForm;
