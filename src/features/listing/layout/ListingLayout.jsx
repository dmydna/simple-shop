import CardEntity from "@/components/common/CardEntity";
import ListingActions from "@/features/listing/components/ListingActions";
import ListingFilter from "@/features/listing/components/ListingFilter";
import { statsService } from "@/features/stats/services/statsService";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useValidParams } from "@/hooks/useValidParams";
import { URL_LISTING_LIST } from "@/utils/links";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';


export default function ListingLayout({ children }) {


    const {idParam, modeParam} = useUrlParams()

    const { data } = useFetchTrigger({ 
        fetchMethod: statsService.getStatsByField, 
        initialTriggers: {field: "status", entity: "listings" } 
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



    // -- PARAM VALIDATIONS --

    const VALID_PARAM_MODES = ['view', 'create', 'edit', 'draft', 'edit.draft']
    const VALID_PARAM_STATUS = ['ACTIVE', 'INACTIVE', 'DELETED', 'DRAFT']

    useValidParams({
        id: (val) => val != null, // Solo números
        mode: (val) => VALID_PARAM_MODES.includes(val), // Solo valores permitidos
        status: (val) => VALID_PARAM_STATUS.includes(val), 
    }, { redirect: URL_LISTING_LIST });

    return (
        <ProtectedRouteAdmin>
                <Container fluid="xl" className="px-sm-4 px-md-4 px-lg-5 align-self-baseline">
                    <Row>

                        <Col lg={3} style={{ top: '60px' }}
                            className={`sticky-lg-bottom h-100 p-0 mb-2 d-none d-md-block`}
                        >

                            {/* --- Sidebar --- */}
                            <div className="">

                                <CardEntity 
                                    activeBack={modeParam}
                                    to={ URL_LISTING_LIST }
                                    title={"Posts"}
                                    ico={"bi-sticky"} 
                                    description={ description } 
                                    variant={"primary"} 
                                />

                                <ParamGuard param="id||hash||mode">
                                    <ListingActions className={"border p-3 island rounded-4 shadow-none"} />
                                </ParamGuard>

                                <ParamGuard param="id||hash||mode" inverse>
                                    <ListingFilter className={"border p-3 island rounded-4 shadow-none"}  />
                                </ParamGuard>

                            </div>

                            {/* -- Modal CRUD-ACTIONS -- */}
                            <ModalParam param="dialog=action">
                                {(close) => 
                                <ListingActions
                                  className={"border p-3 island rounded-4 shadow-none"}  
                                  close={() => close()} 
                                />}
                            </ModalParam>

                            {/* -- Modal LIST-FILTER -- */}
                            <ModalParam param="dialog=filter">
                                {(close) => <ListingFilter 
                                className="island border p-3 rounded-4" 
                                close={() => close()} />}
                            </ModalParam>
                        </Col>

                        <Col lg={9} className="p-0">
                            <CardEntity 
                                ico={"bi-sticky"} 
                                to={ URL_LISTING_LIST }
                                className={'d-flex d-md-none'}
                                title={"Posts"}
                                description={ description } 
                                variant={"primary"} 
                            />
                            <div className="p-4 rounded-4 island border mb-3 mx-0 mx-md-2">
                                {children}
                            </div>
                        </Col>
                    </Row>



                <Toaster duration="7000" position="bottom-length" />
                </Container>
        </ProtectedRouteAdmin>
    )
}

