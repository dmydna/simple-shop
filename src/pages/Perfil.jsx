import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";


export default function Perfil(){
    const {id} = useParams()
    // captura el param mandado por use Navigate

    return (
        <Container fluid="xl" className="mt-4 px-4 px-sm-4 px-md-4 px-lg-5">
            <h2>Perfil del Usuario</h2>
            <p>Bienvenido, <b>{id}</b></p>
        </Container>
    )

}