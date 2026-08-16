import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@f/profile/contexts/ProfileContext";
import { ProfileHeader } from "@f/profile/components/ProfileHeader";


function MyAccount({ children }) {
    const { profile, handleChange, updatePerfil } = useProfile()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log(profile)
        updatePerfil()
    }

    const baseImg = {
        dimension: "100x100"
    }

    return (
        <div className="">

            <ProfileHeader
                title="Cuenta"
                subtitle="Puedes ver o cambiar tu informacion de cuenta"
            />

           
             <p onClick={()=> navigate('/user/photo')} className="btn bg-light border py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Cambiar imagen de perfil</span>
               <i className="bi-chevron-right"></i>
            </p>


             <p onClick={()=> navigate('/complete-register')} className="btn bg-light border py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Proteger cuenta</span>
                <i className="bi-chevron-right"></i>
            </p>

             <p onClick={()=> navigate('/change-password')} className="btn bg-light border py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Cambiar mi contraseña</span>
               <i className="bi-chevron-right"></i>
            </p>

             <p onClick={()=> navigate('/change-email')} className="btn bg-light border py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Cambiar correo electronico</span>
               <i className="bi-chevron-right"></i>
            </p>

            <p onClick={()=> navigate('/#')} className="alert alert-danger pointer py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Eliminar mi cuenta</span>
               <i className="bi-chevron-right"></i>
            </p>

        </div>

    )

}

export default MyAccount;
