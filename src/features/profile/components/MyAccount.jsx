import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";
import { ProfileHeader } from "./ProfileHeader";


function MyAccount({ children }) {
    const { profile, handleChange, updatePerfil } = useProfile()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(profile)
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
                <span>Cambiar imagen de usuario</span>
               <i className="bi-chevron-right"></i>
            </p>


             <p onClick={()=> navigate('/change-password')} className="btn bg-light border py-3 mb-4 text-start w-100 d-flex justify-content-between">
                <span>Cambiar de contraseña</span>
               <i className="bi-chevron-right"></i>
            </p>

            


            <Form id='passwordPerfilForm' style={{ minHeight: '190px' }} onSubmit={handleUpdate}>

                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Ingrese usuario"
                            value={profile?.email || ''}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Form.Group>


                <Form.Group className="mb-4 w-100">
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control
                            className="disabled"
                            type="text"
                            name="email"
                            placeholder="Ingrese usuario"
                            value={profile?.username || ''}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Form.Group>

            </Form>
            <div className='w-100 d-flex justify-content-center'>
                <Button form='passwordPerfilForm' variant="primary" type="submit" className="my-2" >
                    Actualizar
                </Button>
            </div>
        </div>

    )

}

export default MyAccount;
