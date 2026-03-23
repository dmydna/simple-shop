import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import SearchLive from "../../features/search/SearchLive.jsx";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";
import {useUIContext} from "../../contexts/UIContext.jsx";
import "../../styles/animations.css"
import "../../styles/dashboard.css"
import CrudHeader from "../../components/common/CrudHeader.jsx";
import ProductCrudTable from "../../features/product/components/ProductCrudTable.jsx";
import ProductCrudWizard from "../../features/product/components/ProductCrudWizard.jsx";
import {useProductCrud} from "../../features/product/contexts/ProductCrudContex.jsx";
import {useProductContext} from "../../features/product/contexts/ProductContext.jsx";


function ProductCrudNext() {

    const { products, setFilters } = useProductContext()
    const { onHideFilter } =  useUIContext();
    const { setCrudMode ,setShowCrud, setDataItem, expandx, setExpandx, openCreate: openCreateModal } = useProductCrud()

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


    return(

        <Container fluid="xl" className={`mt-4`}
        >
            <CrudHeader
                title="Productos"
                subtitle="administra tus productos"
            />

            <div className='d-flex'>


                {/* Table y filter */}
                <div className={`tableCrudCol 
                ${expandx ? 'active' : ''}`}>
                    {/* Filter */}
                    <Card className="m-0 my-2 ms-lx-2  p-4 border island" >
                        <FilterBar
                            dataSource={products}
                            onApply={setFilters}
                            className="d-block"
                            concealable={false}
                        >
                            <Button
                                variant="primary"
                                onClick={openCreateModal}
                                className="my-2">
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
                    {/* Table */}
                    <ProductCrudTable />

                </div>

                {/* Wizard */}
                <div className={` wizardCrudCol ${expandx ? ' active' : ''}`}>
                    <div
                        style={{top: '60px'}}
                        className="m-0 my-2 ms-lg-2 sticky-top rounded border p-4 island"
                    >
                        <ProductCrudWizard />
                    </div>
                </div>
            </div>
        </Container>
    )

}

export default ProductCrudNext;
