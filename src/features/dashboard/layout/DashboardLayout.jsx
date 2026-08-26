import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import CardEntity from "@dashboard/layout/CardEntity";
import SidebarDash from "@dashboard/common/SidebarDash";
import OffCanvasSidebar from "@/components/common/OffCanvasSidebar";

function DashboardLayout({ children }) {

    return (
        <ProtectedRouteAdmin>
            <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
                <Row className="justify-content-center">

                        <Col lg={3} className="p-0">
                            <CardEntity 
                                offCanvas={true}
                                className={'d-flex'}
                                to={"#"}
                                title={"Dashboard"}
                                ico={"bi-gear"} 
                                description={ "admin" } 
                                variant={"primary"} 
                            />

                           <SidebarDash className={"d-none d-md-block island border p-3 mb-2"} />

                        </Col>

                    <Col lg={9} className="p-0">
                        {children ? children : <Outlet />}
                    </Col>



                </Row>

                <OffCanvasSidebar title={"Panel"} >
                    <SidebarDash />
                </OffCanvasSidebar>

            </Container>            
        </ProtectedRouteAdmin>
    )
}

export default DashboardLayout;