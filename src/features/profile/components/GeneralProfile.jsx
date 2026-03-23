import { Button, Form } from "react-bootstrap";
import { useProfile } from "../hooks/ProfileContext.jsx";



function GeneralProfile({children}){

    const { profile, handleChange, updatePerfil } = useProfile()

   const handleUpdate = (e) => {
        e.preventDefault()
        console.log(profile)
        updatePerfil()
    }

    return(
             <div>
                {children}
                <Form id='informationPerfilForm' style={{minHeight :'370px'}}  onSubmit={handleUpdate}>
                <Form.Group className="mb-3 p-2">
                    <div className="d-flex justify-content-between">
                        <Form.Group className="me-3 w-50">
                           <Form.Label>Nombre</Form.Label>
                           <Form.Control
                               type="text"
                               name="firstName"
                               placeholder="Ingrese usuario"
                               value={profile?.firstName || ''}
                               onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group className="ms-3 w-50">
                           <Form.Label>Apellido</Form.Label>
                           <Form.Control
                               type="text"
                               name="lastName"
                               placeholder="Ingrese usuario"
                               value={profile?.lastName || ''}
                               onChange={handleChange}
                           />
                        </Form.Group>
                    </div>
                </Form.Group>
                <Form.Group  className="mb-3 p-2">
                    <div className="d-flex gap-3">
                        <Form.Group className="me-3 w-50">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                               type="text"
                               name="email"
                               placeholder="Ingrese usuario"
                               value={profile?.email || ''}
                               onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group className="ms-3 w-50">
                           <Form.Label>Domicilio</Form.Label>
                           <Form.Control
                               type="text"
                               name="address"
                               placeholder="Ingrese Domicilio"
                               value={profile?.address || ''}
                               onChange={handleChange}
                           />
                        </Form.Group>
                    </div>

                </Form.Group>
            </Form>
            <Button form='informationPerfilForm' variant="primary" type="submit" className="my-2" >
                Actualizar
            </Button>
            </div>
               
    )

}

export default GeneralProfile;
