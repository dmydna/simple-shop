import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/AuthContext.jsx";
import Activity from "../features/profile/components/Activity.jsx";
import CardSmallProfile from "../features/profile/components/CardSmallProfile.jsx";
import GeneralProfile from "../features/profile/components/GeneralProfile.jsx";
import PasswordProfile from "../features/profile/components/PasswordProfile.jsx";
import SideBarProfile from "../features/profile/components/SideBarProfile.jsx";
import UploadImageProfile from "../features/profile/components/UploadImageProfile.jsx";
import WelcomePerfil from "../features/profile/components/WelcomeProfile.jsx";
import { useProfile } from "../features/profile/contexts/ProfileContext.jsx";
import Dashboard from "./Dashboard.jsx";

export default function UserProfile() {
    const { page } = useParams()
    const [secction, setSecction] = useState(null);
    const { user } = useAuth()
    const { fetchData, profile } = useProfile()


    useEffect(() => {
        fetchData()
    }, [])

	useEffect(()=>{
     console.log([profile?.image])
   },[profile])

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
            case "dashboard":
                setSecction(page); break;
            case "activity":
                setSecction(page); break;
            default:
                setSecction(null); break;
        }
    }, [page])

    // captura el param mandado por use Navigate


    return (
        <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`sticky-md-bottom h-100 col-12 col-sm-12 col-md-12 col-lg-4 px-0 mb-4`}
                    style={{ top: '60px' }} // sin esto no funciona sticky
                >
                    <CardSmallProfile name={user} />
                    <div className="border rounded p-4 island">
                        <SideBarProfile
                            role={profile?.role}
                            onSelection={setSecction}
                        />
                    </div>
                </Col>




                <Col className="h-100 col-12 col-sm-12 col-md-12 col-lg-7 mx-auto rounded border pt-5 p-5 mb-4 island">
                    { (secction == "dashboard" ) && profile?.role == 'ADMIN' && (
                        <Dashboard preview={true}  col='col-12 col-md-12 col-lg-6' />
                    )}
                    { (!secction || secction == "general" || secction == "activity") 
                    && profile?.role == 'ADMIN' && (
                        <Activity container={false}  col='col-12 col-md-12 col-lg-6' />
                      
                    )}
                    {!secction && profile?.role == 'CLIENT' && (
                        <WelcomePerfil >
                            <p className="h4">Bienvenido al panel de usuario</p>
                            <p style={{ opacity: '.5' }} className="muted">Puedes ver o cambiar tu informacion</p>
                        </WelcomePerfil>
                    )}

                    {secction && secction == "general" && profile?.role == 'CLIENT' && (
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
                        <UploadImageProfile 
                            multiple={false} 
                            title={"Cambiar Imagen de profile"}
                            previewImg={[profile?.image]}
                         ></UploadImageProfile>
                    )}

                </Col>


            </Row>

        </Container>
    )

}
