import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext";



function PasswordProfile({ children }) {
    const { profile, handleChange, updatePerfil } = useProfile()

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(profile)
        updatePerfil()
    }
    return (
        <div className="">
            {children}
            <Form id='passwordPerfilForm' style={{ minHeight: '190px' }} onSubmit={handleUpdate}>

                <Form.Group className="w-100 mb-4">
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="password"
                            placeholder="Ingresa constrañea actual"
                            value={profile?.password || ''}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="w-100">
                    <FloatingLabel
                        controlId="floatingNewPassword"
                        label="Confirm Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="newPassword"
                            placeholder="Ingresa constrañea actual"
                            value={profile?.password || ''}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <Button form='passwordPerfilForm' variant="primary" type="submit" className="my-2" >
                Actualizar
            </Button>
        </div>

    )

}

export default PasswordProfile;