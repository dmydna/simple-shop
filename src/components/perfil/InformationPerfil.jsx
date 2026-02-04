import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function InformationPerfil({children}){
    const [value, setValue] = useState("")

    const handleSubmit = () => {

    }
    const handleChange = () => {
        (e) => setUser(e.target.value)
    }
    return(
             <div>
                {children}
                <Form id='informationPerfilForm' style={{minHeight :'370px'}}  onSubmit={handleSubmit}>
                <Form.Group className="mb-3 p-2">
                    <div className="d-flex justify-content-between">
                        <Form.Group className="me-3 w-50">
                           <Form.Label>Usuario</Form.Label>
                           <Form.Control
                               type="text"
                               placeholder="Ingrese usuario"
                               value={value}
                               onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group className="ms-3 w-50">
                           <Form.Label>Apellido</Form.Label>
                           <Form.Control
                               type="text"
                               placeholder="Ingrese usuario"
                               value={value}
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
                               placeholder="Ingrese usuario"
                               value={value}
                               onChange={handleChange}
                           />
                        </Form.Group>
                        <Form.Group className="ms-3 w-50">
                           <Form.Label>Cumpleaños</Form.Label>
                           <Form.Control
                               type="text"
                               placeholder="Ingrese usuario"
                               value={value}
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

export default InformationPerfil;