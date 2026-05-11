import { Col, Container, Row } from "react-bootstrap";
import UserActions from "./UserActions";

export default function UserLayout({children}) {


    return (
        <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
            <Row>

                <Col lg={3} style={{ top: '60px' }}
                    className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                >
                    <div className="border rounded p-0 island">
                        <UserActions />
                    </div>
                </Col>

                <Col lg={9} className="p-0">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}