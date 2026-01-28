import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function PasswordPerfil({children}){
    const [value, setValue] = useState("")

    const handleSubmit = () => {

    }
    const handleChange = () => {
        (e) => setUser(e.target.value)
    }
    return(
             <div className="">
                {children}
                <Form  onSubmit={handleSubmit}>
                <Form.Group className="mb-3 p-2">
                    <Form.Group className="me-3 w-100">
                           <Form.Label>Usuario</Form.Label>
                           <Form.Control
                               type="text"
                               placeholder="Ingresa constrañea actual"
                               value={value}
                               onChange={handleChange}
                           />
                        </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3 p-2">
                    <Form.Group className="me-3 w-100">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                               type="text"
                               placeholder="Ingrese nueva contraseña"
                               value={value}
                               onChange={handleChange}
                           />
                        </Form.Group>
                </Form.Group>
                <Button variant="primary" type="submit" className="my-2" >
                    Actualizar
                </Button>
            </Form>
            </div>
               
    )

}

export default PasswordPerfil;