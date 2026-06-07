import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import SidebarDashboard from "../common/SiderbarDashboard";

function DashboardLayout({ children }) {

    return (
        <ProtectedRouteAdmin>
            <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
                <Row>

                    <Col lg={3} style={{ top: '60px' }}
                        className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                    >
                        <div className="border rounded p-3 island">
                            <SidebarDashboard  showHearder/>
                        </div>
                    </Col>

                    <Col lg={9} className="p-0">
                        {children ? children : <Outlet />}
                    </Col>
                </Row>
            </Container>            
        </ProtectedRouteAdmin>
    )
}

export default DashboardLayout;