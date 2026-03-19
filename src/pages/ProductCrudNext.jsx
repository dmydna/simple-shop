import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import FilterBar from "../features/filters/components/FilterBar.jsx";
import SearchLive from "../features/search/SearchLive.jsx";
import DropdownCheck from "../components/common/DropdownCheck.jsx";
import {useUIContext} from "../contexts/UIContext.jsx";
import {CRUD} from "../utils/crud.js";
import ProductCrudTable from "../features/product/components/ProductCrudTable.jsx";
import "../styles/animations.css"
import CrudHeader from "../components/common/CrudHeader.jsx";
import {useListingContext} from "../features/listing/contexts/ListingContext.jsx";
import {useListingCrud} from "../features/listing/contexts/ListingCrudContext.jsx";



function ProductCrudNext() {

    const { products, setFilters } = useListingContext()
    const { onHideFilter } =  useUIContext();
    const { setCrudMode, crudMode ,setShowCrud, setDataItem,
        expandx, setExpandx , showCrud} = useListingCrud()

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
        setDataItem({ });
        setShowCrud(true);
        setExpandx(true);
    };

    return(
      <Container fluid="xl" className="mt-4">
                <Row className="g-0" md={4}>
                    <CrudHeader
                        title="Products"
                        subtitle="administra tus productos"
                    />
                    {/* Table y filter */}
                    <div className={`tableCrudCol 
                     ${expandx ? 'active' : ''}`}>
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
                        <ProductCrudTable />
                    </div>

                    {/* CUPON */}

                    {/* Wizard */}
                    <div className={` wizardCrudCol ${expandx ? ' active' : ''}`}>
                        <div
                            style={{top: '60px'}}
                            className="m-0 my-2 ms-lg-2 sticky-top rounded border p-4 island"
                        >
                            
                        </div>
                    </div>
                </Row>
            </Container>
    )

}

export default ProductCrudNext;
