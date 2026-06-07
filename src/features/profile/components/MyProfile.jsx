import PageError from "@/pages/fallback/PageError.jsx";
import PageLoading from "@/pages/fallback/PageLoading.jsx";
import PageSuccess from "@/pages/fallback/PageSuccess.jsx";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { ProfileHeader } from "./ProfileHeader.jsx";



function MyProfile({ children }) {

    const { profile, handleChange, updatePerfil, loading, setError, error, success, setSuccess } = useProfile()

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(profile)
        updatePerfil()
    }

    return (
        <>
        {error && (<PageError  handle={()=>setError(null)} />)}
        {loading && (<PageLoading />)}
        {success && (<PageSuccess handle={()=> setSuccess(false)} />)}
        {!loading && !error && !success && (
        <div>
            <ProfileHeader
                title="Informacion Personal"
                subtitle="Puedes ver o cambiar tu informacion"
            />

            <Form id='informationPerfilForm' style={{ minHeight: '370px' }} onSubmit={handleUpdate}>

                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingName"
                        label="Name"
                        className="mb-3"
                    >
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Ingrese usuario"
                        value={profile?.firstName || ''}
                        onChange={handleChange}
                    />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingLastname"
                        label="Lastname"
                        className="mb-3"
                    >
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Ingrese apellido"
                        value={profile?.lastName || ''}
                        onChange={handleChange}
                    />
                    </FloatingLabel>

                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingAddress"
                        label="Address"
                        className="mb-3"
                    >
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Ingrese Domicilio"
                        value={profile?.address || ''}
                        onChange={handleChange}
                    />
                   </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingPhone"
                        label="Phone"
                        className="mb-3"
                    >
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Ingrese Telefono"
                        value={profile?.phone || ''}
                        onChange={handleChange}
                    />
                   </FloatingLabel>
                </Form.Group>

            </Form>
            <div className='w-100 d-flex justify-content-center'> 
               <Button form='informationPerfilForm' variant="primary" type="submit" className="my-2" >
                   Actualizar
               </Button>
           </div>

        </div>
        )}

        </>


    )

}

export default MyProfile;
