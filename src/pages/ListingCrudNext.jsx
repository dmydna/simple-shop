import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ListingCrudTable from "../features/listing/components/ListingCrudTable.jsx";
import FilterBar from "../features/filters/components/FilterBar.jsx";
import SearchLive from "../features/search/SearchLive.jsx";
import DropdownCheck from "../components/common/DropdownCheck.jsx";
import {useListingContext} from "../features/listing/contexts/ListingContext.jsx";
import {useUIContext} from "../contexts/UIContext.jsx";
import {useListingCrud} from "../features/listing/contexts/ListingCrudContext.jsx";
import {CRUD} from "../utils/crud.js";
import ListingFormCrud from "../features/listing/components/ListingFormCrud.jsx";
import {getVisibleSteps, step} from "../features/listing/hooks/wizardConfig.js";
import "../styles/animations.css"
import CrudHeader from "../components/common/CrudHeader.jsx";
import {WizardProvider} from "../contexts/WisardContext.jsx";



function ListingCrudNext() {

    const { listings, setFilters } = useListingContext()
    const { onHideFilter } =  useUIContext();
    const { setCrudMode, crudMode ,setShowCrud, setCurrentItem, setCurrentStep } = useListingCrud()

    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()

    // Carga inicial

    useEffect(()=>{
        if(search)  setFilters({page:0, title: search })
    }, [search])

    useEffect(() => {
        onHideFilter(true);
        if(!isCreating){ setIsCreating(true) }
    }, []);


    const openCreateModal = () => {
        setCrudMode(CRUD.CREATE);
        setCurrentItem({ title: "", description: "" });
        setCurrentStep(step.OPTIONS_CREATE)
        setShowCrud(true);
        setExpandx(true);
    };


    const { expandx, setExpandx} = useListingCrud()


    return(
        <WizardProvider
            mode={crudMode}
            getVisibleSteps={getVisibleSteps}
            step={step}
        >
        <Container fluid="xl" className="mt-4">
            <Row className="g-0" md={4}>

                <CrudHeader
                    title="Listing"
                    subtitle="administra tus publicaciones"
                />

                {/* MY CART */}
                <Col className={`${expandx ? 
                    'col-transition d-none d-xl-block col-xl-5' : 
                    'col-12 col-md-12'} col-lg-12`}>
                    <Card className="m-0 my-2 ms-lx-2  p-4 border island" >
                        <FilterBar
                            dataSource={listings}
                            onApply={setFilters}
                            className="d-block"
                            concealable={false}
                        >
                            <Button variant="primary" onClick={openCreateModal} className="my-2">
                                <i className="bi bi-plus-lg"></i>
                                <span className="ms-2">Create new</span>
                            </Button>
                            <SearchLive
                                className='flex-fill'
                                items={listings}
                                handleSearch={setSearch}
                            />
                            <DropdownCheck variant="light"  className="border rounded my-2">
                                <span className="fw-semibold">etiquetas</span>
                            </DropdownCheck>
                        </FilterBar>
                    </Card>
                    <ListingCrudTable>
                    </ListingCrudTable>
                </Col>

                {/* CUPON */}

                <Col className={`col-transition fade-in 
                 ${expandx ? 'col-12 col-xl-7 rise-and-pop' : 'd-none'} col-lg-12`}>
                    {/* MY ORDER CART  */}
                    <ListingFormCrud
                        style={{top: '60px'}}
                        className="m-0 my-2 ms-lg-2 sticky-md-top rounded border p-4 island"
                    />
                </Col>
                <ToastContainer />
            </Row>
        </Container>
            </WizardProvider>
    )

}

export default ListingCrudNext;
