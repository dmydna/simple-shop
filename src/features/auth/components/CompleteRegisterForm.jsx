
import PageLoading from "@/pages/fallback/PageLoading";
import { useProfile } from "@features/profile/contexts/ProfileContext.jsx";
import { Button, Col, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function CompleteRegisterForm({ children, className, style }) {

    const { loading, profile, handleChange, updatePerfil } = useProfile()

    const navigate = useNavigate()

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(profile)
        await updatePerfil()
        navigate('/user')
    }

    return (
        <Col className={`${className} mx-auto`} style={{ ...style, minHeight: '400px' }}>

            {loading && (
                <PageLoading message='actualizando cuenta...' />
            )}
            {!loading && (
                <>
                    {children}
                    <Form id='informationPerfilForm' onSubmit={handleUpdate}>

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
                                label="Last name"
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

                        <Form.Group className="mb-4 w-100">
                            <FloatingLabel
                                controlId="floatingAddress"
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
                    <Button form='informationPerfilForm' variant="primary" type="submit" className="w-100 my-2">
                        Actualizar
                    </Button>
                </>
            )}



        </Col>

    )

}
export default CompleteRegisterForm;
