import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import BanUser from "@dashboard/user/BanUser";
import UserActions from "@dashboard/user/UserActions";
import UserFilter from "@dashboard/user/UserFilter";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';


export default function UserLayout({ children }) {

    return (
        <ProtectedRouteAdmin>
            <>
                <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
                    <Row>

                        <Col lg={3} style={{ top: '60px' }}
                            className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                        >
                            {/* -- Sidebar -- */}
                            <div className="border rounded p-0 island">

                                <ParamGuard param="id||hash||mode">
                                    <UserActions />
                                </ParamGuard>

                                <ParamGuard param="id||hash||mode" inverse>
                                    <UserFilter />
                                </ParamGuard>

                            </div>

                            {/* -- Modal CRUD-ACTIONS -- */}
                            <ModalParam param="dialog=action">
                                {(close) => <UserActions close={() => close()} />}
                            </ModalParam>

                            {/* -- Modal USER-BAN -- */}
                            <ModalParam param="dialog=ban.update, ban.create" >
                                {(close) => <BanUser close={() => close()} />}
                            </ModalParam>

                            {/* -- Modal LIST-FILTER -- */}
                            <ModalParam param="dialog=filter">
                                {(close) => <UserFilter close={() => close()} />}
                            </ModalParam>

                        </Col>

                        <Col lg={9} className="p-0">
                            {children}
                        </Col>
                    </Row>
                </Container>
                <Toaster duration="7000" position="bottom-length" />
            </>
        </ProtectedRouteAdmin>
    )
}