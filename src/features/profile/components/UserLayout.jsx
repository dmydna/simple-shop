import { Container, Row, Col } from "react-bootstrap";
import CardProfile from "./CardProfile";
import { Outlet } from 'react-router-dom';
import { useProfile } from "../contexts/ProfileContext";
import { useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";



const UserLayout = () => {

    const { user } = useAuthContext()
    const { fetchData, profile } = useProfile()

    useEffect(() => {
        fetchData()
    }, [])

    return (
         <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`sticky-lg-bottom h-100 col-12 col-sm-12 col-md-12 col-lg-3 px-0 mb-2`}
                    style={{ top: '60px' }} 
                >
                    <CardProfile name={user} />
                    <div className="border rounded p-3 island d-none d-md-block">
                        <SideBarProfile 
                            role={profile?.role}
                        />
                    </div>
                </Col>


                <Col className="col-12 col-sm-12 col-md-12 col-lg-9 px-0 px-md-2">
                    <div className="h-100 col-12 rounded border p-4 mb-4 island">
                           <Outlet/>
                    </div>

                </Col>

            </Row>

        </Container>
    )
}


export default UserLayout;