import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext.jsx";


function WelcomePerfil({children}){

   const { updateImage, loading, profile } = useProfile();
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
