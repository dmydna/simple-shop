import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InformationPerfil from "../components/perfil/InformationPerfil";
import CardPerfil from "../components/perfil/CardPerfil";
import PerfilSideBar from "../components/perfil/PerfilSideBar";
import PasswordPerfil from "../components/perfil/PasswordPerfil";
import { useEffect, useState } from "react";
import UserPerfil from "../components/perfil/UserPerfil";

export default function User() {
    const { page } = useParams()
    const [secction, setSecction] = useState(null);


    useEffect(() => {
        switch (page) {
            case "information":
                setSecction(page); break;
            case "password":
                setSecction(page); break;
            case "perfil":
                setSecction(page); break;
            case "social":
                setSecction(page); break;
        }
    }, [page])

    // captura el param mandado por use Navigate


    return (
        <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`col-12 col-sm-6 col-md-4 col-lg-4 px-0 mb-4`}>
                    <CardPerfil name={'admin'}></CardPerfil>
                    <div className="border rounded p-4">
                        <PerfilSideBar onSelection={setSecction}></PerfilSideBar>
                    </div>

                </Col>
                <Col className="col-12 col-sm-6 col-md-4 col-lg-7 mx-auto rounded border pt-5 p-5 mb-4">
                    {secction && secction == "information" && (
                        <InformationPerfil >
                            <p className="h4">Bienvenido a la informacion de usuario</p>
                            <p style={{ opacity: '.5' }} className="muted">Puedes ver o cambiar tu informacion</p>
                        </InformationPerfil>
                    )}
                    {secction && secction == "password" && (
                        <PasswordPerfil>
                            <p className="h4">Cambiar contraseña</p>
                            <p style={{ opacity: '.5' }} className="muted">Puedes ver o cambiar tu contraseña</p>
                        </PasswordPerfil>
                    )}
                    {secction && secction == "perfil" && (
                        <UserPerfil multiple={false} title={"Cambiar Imagen de perfil"}></UserPerfil>
                    )}

                </Col>
            </Row>

        </Container>
    )

}