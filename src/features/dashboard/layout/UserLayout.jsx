import { useUrlParams } from "@/hooks/useUrlParams";
import { useValidParams } from "@/hooks/useValidParams";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import BanUser from "@dashboard/user/BanUser";
import UserActions from "@dashboard/user/UserActions";
import UserFilter from "@dashboard/user/UserFilter";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';
import CardEntity from "@dashboard/layout/CardEntity";
import { statsService } from "@/features/stats/services/statsService";
import { useMemo } from "react";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { URL_USER_LIST } from "@/utils/links";


export default function UserLayout({ children }) {


    const {idParam, modeParam} = useUrlParams()

    const { data } = useFetchTrigger({ 
        fetchMethod: statsService.getStatsByField, 
        initialTriggers: {field: "status", entity: "users" } 
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

   const VALID_PARAM_MODES = ['view', 'edit', 'create'];
   const VALID_PARAM_STATUS = ['ACTIVE','INACTIVE','BANNED', 'DELETED']

   useValidParams({
     id: (val)     => val != null, 
     mode: (val)   => VALID_PARAM_MODES.includes(val), // Solo valores permitidos
     status: (val) => VALID_PARAM_STATUS.includes(val), 
   }, {redirect: URL_USER_LIST });


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
                                to={ URL_USER_LIST }
                                title={"Users"}
                                ico={"bi-person"} 
                                description={ description  } 
                                variant={"danger"} 
                            />

                                <ParamGuard param="id||hash||mode">
                                    <UserActions className="border p-3 island rounded-4 shadow-none" />
                                </ParamGuard>

                                <ParamGuard param="id||hash||mode" inverse>
                                    <UserFilter className="border p-3 island rounded-4 shadow-none" />
                                </ParamGuard>

                            </div>

                            {/* -- Modal CRUD-ACTIONS -- */}
                            <ModalParam param="dialog=action">
                                {(close) => 
                                <UserActions 
                                    className={"border p-3 island rounded-4 shadow-none"} 
                                    close={() => close()} 
                                />}
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

                            <CardEntity 
                                className={"d-flex d-md-none"}
                                to={ URL_USER_LIST }
                                title={"Users"}
                                ico={"bi-person"} 
                                description={ description  } 
                                variant={"danger"} 
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