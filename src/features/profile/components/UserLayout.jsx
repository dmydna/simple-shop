import { Container, Row, Col } from "react-bootstrap";
import CardProfile from "./CardProfile";
import { Outlet } from 'react-router-dom';
import { useProfile } from "../contexts/ProfileContext";
import { useAuth } from "@/features/auth/hooks/AuthContext";
import { useEffect } from "react";
import SideBarProfile from "./SideBarProfile";



const UserLayout = () => {

    const { user } = useAuth()
    const { fetchData, profile } = useProfile()

    useEffect(() => {
        fetchData()
    }, [])

    return (
         <Container fluid="xl" className="px-4 px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`sticky-lg-bottom h-100 col-12 col-sm-12 col-md-12 col-lg-4 px-0 mb-4`}
                    style={{ top: '60px' }} 
                >
                    <CardProfile name={user} />
                    <div className="border rounded p-4 island">
                        <SideBarProfile
                            role={profile?.role}
                        />
                    </div>
                </Col>


                <Col className="h-100 col-12 col-sm-12 col-md-12 col-lg-7 mx-auto rounded border pt-5 p-5 mb-4 island">
                    <Outlet/>
                </Col>

            </Row>

        </Container>
    )
}


export default UserLayout;