import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import FilterBar from "../features/filters/components/FilterBar.jsx";
import SearchLive from "../features/search/SearchLive.jsx";
import DropdownCheck from "../components/common/DropdownCheck.jsx";
import {useUIContext} from "../contexts/UIContext.jsx";
import {CRUD} from "../utils/crud.js";
import {useProductContext} from "../features/product/context/ProductContext.jsx";
import {useProductCrud} from "../features/product/context/ProductCrudContex.jsx";
import ProductCrudTable from "../features/product/components/ProductCrudTable.jsx";
import ProductFormCrud from "../features/product/components/ProductFormCrud.jsx";
import "../styles/animations.css"
import CrudHeader from "../components/common/CrudHeader.jsx";
import {getVisibleSteps, step} from "../features/listing/hooks/wizardConfig.js";
import {WizardProvider} from "../contexts/WisardContext.jsx";


function ProductCrudNext() {

    const baseHook = useProductContext()
    const crudHook = useProductCrud()


    const {onHideFilter} =  useUIContext();

    const { setShowCrud, setCrudMode, setCurrentItem,
    setCurrentStep, expandx, setExpandx, crudMode}   = crudHook
    const { products, content, setFilters } = baseHook


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
        setShowCrud(true);
        setExpandx(true);
        setCurrentStep(step.OPTIONS_CREATE)
    };

    return(
        <WizardProvider
            mode={crudMode}
            getVisibleSteps={getVisibleSteps}
            step={step}
        >
            <Container fluid="xl" className="mt-4">
                <Row className="g-0" md={4}>
                    <CrudHeader
                        title="Products"
                        subtitle="administra tus productos"
                    />
                    {/* MY CART */}
                    <Col className={`${expandx ? 
                        'col-transition fade-in d-none d-xl-block col-xl-5' : 
                        'col-12 col-md-12'} col-lg-12`}>
                        <Card className="m-0 my-2 m-lx-2  p-4 border island" >
                            <FilterBar
                                dataSource={products}
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
                                    items={products}
                                    handleSearch={setSearch}
                                />
                                <DropdownCheck variant="light"  className="border rounded my-2">
                                    <span className="fw-semibold">etiquetas</span>
                                </DropdownCheck>
                            </FilterBar>
                        </Card>
                        <ProductCrudTable></ProductCrudTable>
                    </Col>

                    {/* CUPON */}

                    <Col className={` ${expandx ? 'col-12 col-xl-7 rise-and-pop' : 'd-none'} col-lg-12`}>
                        {/* MY ORDER CART  */}
                        <ProductFormCrud
                            style={{top: '60px'}}
                            className="m-0 my-2 m-lg-2 sticky-md-top rounded border p-4 island"
                        />
                    </Col>
                    <ToastContainer />
                </Row>
            </Container>
            </WizardProvider>
    )

}

export default ProductCrudNext;
