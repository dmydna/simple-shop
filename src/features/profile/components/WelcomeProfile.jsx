import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Col, Form} from "react-bootstrap";
import {useAuth} from "../../auth/hooks/AuthContext.jsx";
import {useUser} from "../hooks/UserContext.jsx";


function WelcomePerfil({children}){

   const { updateImage, loading, profile } = useUser();
   const [ completeRegistration, setCompleteRegistration ] = useState(false)
   
   useEffect(()=>{
     if(
        profile?.firstName?.trim() || 
        profile?.lastName?.trim() ||
        profile?.address?.trim() ||
        profile?.phone?.trim()
     )  { setCompleteRegistration(true) } 
     else { setCompleteRegistration(false) }
   },[profile])


    return(
        <div>
            {children}
            <div style={{minHeight:'200px'}}>
                { !completeRegistration && ( 
                 <div className="h-100">
                      <Alert variant="danger">
                         Completa el proceso de registro para poder continuar.
                      </Alert>
                 </div> 
                )}
            </div>
            <Button as={Link} to={'general/'}  variant="primary" type="submit" className="my-2" >
                    Continuar
           </Button>

        </div>

    )

}

export default WelcomePerfil;
