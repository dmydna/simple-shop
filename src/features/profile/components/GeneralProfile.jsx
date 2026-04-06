import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext.jsx";



function GeneralProfile({ children }) {

    const { profile, handleChange, updatePerfil } = useProfile()

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(profile)
        updatePerfil()
    }

    return (
        <div>
            {children}
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
            </Form>
            <Button form='informationPerfilForm' variant="primary" type="submit" className="my-2" >
                Actualizar
            </Button>
        </div>

    )

}

export default GeneralProfile;
