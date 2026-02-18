import { Col, Container, Row } from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import GeneralProfile from "../features/profile/components/GeneralProfile.jsx";
import CardProfile from "../features/profile/components/CardProfile.jsx";
import SideBarProfile from "../features/profile/components/SideBarProfile.jsx";
import PasswordProfile from "../features/profile/components/PasswordProfile.jsx";
import { useEffect, useState } from "react";
import UploadImageProfile from "../features/profile/components/UploadImageProfile.jsx";
import WelcomePerfil from "../features/profile/components/WelcomeProfile.jsx";
import {useAuth} from "../features/auth/hooks/AuthContext.jsx";
import CardSmallProfile from "../features/profile/components/CardSmallProfile.jsx";
import {useUser} from "../features/profile/hooks/UserContext.jsx";

export default function UserProfile() {
    const { page } = useParams()
    const [secction, setSecction] = useState(null);
    const {user} = useAuth()
    const {fetchData, profile} = useUser()


    useEffect(  ()=>{
        fetchData()
    },[])

    useEffect(() => {

        switch (page) {
            case "general":
                setSecction(page); break;
            case "password":
                setSecction(page); break;
            case "image":
                setSecction(page); break;
            case "social":
                setSecction(page); break;
        }
    }, [page])

    // captura el param mandado por use Navigate


    return (
        <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`sticky-md-bottom h-100 col-12 col-sm-12 col-md-12 col-lg-4 px-0 mb-4`}
                     style={{ top: '60px'}} // sin esto no funciona sticky
                >
                    <CardSmallProfile name={user} />

                    <div className="border rounded p-4 island">
                        <SideBarProfile onSelection={setSecction}></SideBarProfile>
                    </div>

                </Col>
                <Col className="h-100 col-12 col-sm-12 col-md-12 col-lg-7 mx-auto rounded border pt-5 p-5 mb-4 island">

                    {!secction && (
                        <WelcomePerfil >
                            <p className="h4">Bienvenido al panel de usuario</p>
                            <p style={{ opacity: '.5' }} className="muted">Puedes ver o cambiar tu informacion</p>
                        </WelcomePerfil>
                    )}

                    {secction && secction == "general" && (
                        <GeneralProfile >
                            <p className="h4">Informacion general</p>
                            <p style={{ opacity: '.5' }} className="muted mb-5">Puedes ver o cambiar tu informacion</p>
                        </GeneralProfile>
                    )}
                    {secction && secction == "password" && (
                        <PasswordProfile>
                            <p className="h4">Cambiar contraseña</p>
                            <p style={{ opacity: '.5' }} className="muted mb-5">Puedes ver o cambiar tu contraseña</p>
                        </PasswordProfile>
                    )}
                    {secction && secction == "image" && (
                        <UploadImageProfile multiple={false} title={"Cambiar Imagen de profile"}></UploadImageProfile>
                    )}

                </Col>
            </Row>

        </Container>
    )

}
