import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useProfile } from "@f/profile/contexts/ProfileContext.jsx";
import { ProfileHeader } from "@f/profile/components/ProfileHeader.jsx";
import FetchStateModal from "@/components/common/FetchStateModal.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CompleteUserRegister } from "@/utils/schemas.js";
import FormProfile from "@f/profile/components/FormProfile.jsx";



function MyProfile({ children }) {

    const { profile, updatePerfil, loading, setError, error, success, setSuccess } = useProfile()

    const { reset, register, handleSubmit, formState: { errors } } 
        = useForm({ 
            resolver: zodResolver(CompleteUserRegister), 
            defaultValues: profile,
            // mode: 'onTouched', 
            // reValidateMode: 'onChange'
        });

    useEffect(()=>{
        // setea valores iniciales
        reset(profile)
    },[profile])

    const onSubmit = async (data) => {
        await updatePerfil(data)
    };
    return (
        <FetchStateModal
            hook={{loading, error, setError, success, setSuccess}}
        >
        <div>
            <ProfileHeader
                title="Informacion Personal"
                subtitle="Puedes ver o cambiar tu informacion"
            />
            
            <FormProfile
                id={"informationPerfilForm"} 
                submit={handleSubmit(onSubmit)} 
                formHook={{errors, register}}
            />

            <div className='w-100 d-flex justify-content-center'> 
               <Button 
                    className="my-2"
                    form='informationPerfilForm' 
                    variant="primary" 
                    type="submit"
                > 
                   Actualizar
               </Button>
           </div>
        </div>
        </FetchStateModal>


    )

}

export default MyProfile;
