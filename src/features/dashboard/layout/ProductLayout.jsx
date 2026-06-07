import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import ProductActions from "@dashboard/product/ProductActions";
import ProductFilter from "@dashboard/product/ProductFilter";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';


function ProductLayout({ children }) {

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
                                <ProductActions />
                            </ParamGuard>

                            <ParamGuard param="id||hash||mode" inverse>
                                <ProductFilter />
                            </ParamGuard>

                        </div>

                        {/* -- Modal CRUD-ACTIONS -- */}
                        <ModalParam param="dialog=action">
                            {(close) => <ProductActions close={() => close()} />}
                        </ModalParam>

                        {/* -- Modal LIST-FILTER -- */}
                        <ModalParam param="dialog=filter">
                            {(close) => <ProductFilter close={() => close()} />}
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

export default ProductLayout;
