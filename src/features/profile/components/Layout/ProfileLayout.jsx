import OffCanvasSidebar from "@/components/common/OffCanvasSidebar";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import CardProfile from "@f/profile/components/CardProfile";
import SidebarProfile from "@f/profile/components/SidebarProfile";
import { useProfile } from "@f/profile/contexts/ProfileContext";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from 'react-router-dom';



const ProfileLayout = () => {

    const { user } = useAuthContext()
    const { fetchData, profile } = useProfile()

/*    useEffect(() => {
        fetchData()
    }, [])*/

    return (
         <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
            <Row>
                <Col className={`sticky-lg-bottom h-100 col-12 col-sm-12 col-md-12 col-lg-3 px-0`}
                    style={{ top: '60px' }} 
                >
                    <CardProfile name={user} />
                    
                    <div className="border rounded-4 p-3 island d-none d-md-block">
                        <SidebarProfile 
                            role={profile?.role}
                        />
                    </div>
                </Col>


                <Col className="col-12 col-sm-12 col-md-12 col-lg-9 px-0 px-md-2">
                    <div className="h-100 min-vh-md-70 col-12 rounded-4 border p-4 mb-4 island">
                           <Outlet/>
                    </div>

                </Col>

            </Row>

                <OffCanvasSidebar title={"User"} >
                    <SidebarProfile 
                       role={profile?.role}
                    />
                </OffCanvasSidebar>

        </Container>
    )
}


export default ProfileLayout;