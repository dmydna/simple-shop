import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserListConfig from "./UserListConfig";
import UserListCrud from "./UserListCrud";

export default function UserListLayout({children}) {

    const [currentItem, setCurrentItem] = useState()

    return (
        <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
            <Row>

                <Col lg={3} style={{ top: '60px' }}
                    className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                >
                    <div className="border rounded p-0 island">
                        <UserListConfig
                            item={currentItem}
                        ></UserListConfig>
                    </div>
                </Col>

                <Col lg={9} className="p-0">
                    <UserListCrud 
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                    />
                </Col>
            </Row>
        </Container>
    )
}

