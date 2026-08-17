import { useUrlParams } from "@/hooks/useUrlParams";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import ProductActions from "@dashboard/product/ProductActions";
import ProductFilter from "@dashboard/product/ProductFilter";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';
import CardEntity from "@dashboard/layout/CardEntity";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { useMemo } from "react";
import { statsService } from "@/features/stats/services/statsService";
import { URL_PRODUCT_LIST } from "@/utils/links";


function ProductLayout({ children }) {

    const {idParam, modeParam} = useUrlParams()

    const {data, loading, error} = useFetchTrigger({ 
        fetchMethod: statsService.getStatsByField, 
        initialTriggers: {field: "status", entity: "products" } 
    })

    const description = useMemo(()=>{
        if(idParam){
            return `# ${idParam}` 
        }
        if(Array.isArray(data)){
            const {name, count} = data[0];
            return `${count} (${name.toLowerCase()})` 
        }
        return "";
          
    },[idParam, data])


    return (
        <ProtectedRouteAdmin>
        <>
            <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5">
                <Row>

                    <Col lg={3} style={{ top: '60px' }}
                        className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                    >
                        {/* -- Sidebar -- */}

                        <div className="">

                            <CardEntity
                                activeBack={modeParam}
                                to={ URL_PRODUCT_LIST }
                                title={"Products"}
                                ico={"bi-box-seam"} 
                                description={ description  } 
                                variant={"success"} 
                            />

                            <ParamGuard param="id||hash||mode">
                                <ProductActions className={"border p-3 island rounded-4 shadow-none"} />
                            </ParamGuard>

                            <ParamGuard param="id||hash||mode" inverse>
                                <ProductFilter className={"border p-3 island rounded-4 shadow-none"}  />
                            </ParamGuard>

                        </div>

                        {/* -- Modal CRUD-ACTIONS -- */}
                        <ModalParam param="dialog=action">
                            {(close) => 
                            <ProductActions
                                className={"border p-3 island rounded-4 shadow-none"} 
                                close={() => close()} 
                            />}
                        </ModalParam>

                        {/* -- Modal LIST-FILTER -- */}
                        <ModalParam param="dialog=filter">
                            {(close) => <ProductFilter close={() => close()} />}
                        </ModalParam>

                    </Col>

                    <Col lg={9} className="p-0">

                        <CardEntity
                            className={"d-flex d-md-none"}
                            to={ URL_PRODUCT_LIST }
                            title={"Products"}
                            ico="bi-box-seam" 
                            description={ description  } 
                            variant={"success"} 
                        />

                        <div className="p-4 rounded-4 island border mb-3 mx-0 mx-md-2">
                            {children}
                        </div>
                    </Col>

                </Row>
            </Container>
            <Toaster duration="7000" position="bottom-length" />
        </>
        </ProtectedRouteAdmin>
    )
}

export default ProductLayout;
