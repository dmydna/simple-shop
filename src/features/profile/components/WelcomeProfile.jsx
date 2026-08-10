import { useEffect, useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { ProfileHeader } from "./ProfileHeader";
import { useWarning } from "@/hooks/useWarning.js";

function WelcomePerfil({ children }) {

   const navigate = useNavigate()
   const { loading, profile } = useProfile();
   const { completeRegistration } = useWarning()
   

   return (
      <div>
         <ProfileHeader
            title={`¡Bienvenido ${profile?.username || ''}!`}
            subtitle="Aquí puedes gestionar todo lo relacionado con tu cuenta."
         />
         <div style={{ minHeight: '200px' }}>
            {!completeRegistration && ( 
               <div className="h-100">
                  <Alert variant="danger">
                     <i className="bi bi-exclamation-triangle me-3"></i>
                     Completa el proceso de registro haciendo click  
                     <b onClick={() => navigate('/register/complete')} className="text-dark mx-2" href="/complete-register">aqui.</b>   
                  </Alert>
               </div> 
            )}

            <p onClick={() => navigate('/faqs')} className="btn bg-light border py-3 mb-3 text-start w-100 d-flex justify-content-between">
               <span>Preguntas Frecuentes</span>
               <i className="bi-chevron-right"></i>
            </p>

            <p onClick={() => navigate('/user/account')} className="btn bg-light border py-3 mb-3 text-start w-100 d-flex justify-content-between">
               <span>Cambiar contraseña</span>
               <i className="bi-chevron-right"></i>
            </p>

            <p onClick={() => navigate('/user/profile')} className="btn bg-light border py-3 mb-3 text-start w-100 d-flex justify-content-between">
               <span>Actualizar datos personales</span>
               <i className="bi-chevron-right"></i>
            </p>

            <p onClick={() => navigate('/user/purchases')} className="btn bg-light border py-3 mb-3 text-start w-100 d-flex justify-content-between">
               <span>Ver historial de compras</span>
               <i className="bi-chevron-right"></i>
            </p>

            <p onClick={() => navigate('/user/photo')} className="btn bg-light border py-3 mb-3 text-start w-100 d-flex justify-content-between">
               <span>Cambiar imagen de usuario</span>
               <i className="bi-chevron-right"></i>
            </p>

         </div>


      </div>

   )

}

export default WelcomePerfil;
