import React, {useEffect, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import ListingCrudTable from "../../features/listing/components/ListingCrudTable.jsx";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import SearchLive from "../../features/search/SearchLive.jsx";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";
import {useListingContext} from "../../features/listing/contexts/ListingContext.jsx";
import {useUIContext} from "../../contexts/UIContext.jsx";
import {useListingCrud} from "../../features/listing/contexts/ListingCrudContext.jsx";
import { useListing } from "../../features/listing/hooks/useListing.js";
import {CRUD} from "../../utils/crud.js";
import "../../styles/animations.css"
import "../../styles/dashboard.css"
import CrudHeader from "../../components/common/CrudHeader.jsx";
import ListingCrudWizard from "../../features/listing/components/ListingCrudWizard.jsx";



function ListingCrudNext() {

    const { listings, setFilters } = useListingContext()
    const { onHideFilter } =  useUIContext();
    const { setCrudMode, crudMode ,setShowCrud, setDataItem,
        expandx, setExpandx , showCrud } = useListingCrud()

    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()


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

        <Container fluid="xl" className={`mt-4`}
        >
            <CrudHeader
                title="Listing"
                subtitle="administra tus publicaciones"
            />

            <div className='d-flex'>


                {/* Table y filter */}
                <div className={`tableCrudCol 
                ${expandx ? 'active' : ''}`}>
                    {/* Filter */}
                    <Card className="m-0 my-2 ms-lx-2  p-4 border island" >
                        <FilterBar
                            dataSource={listings}
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
                                items={listings}
                                handleSearch={setSearch}
                            />
                            <DropdownCheck variant="light"  className="border rounded my-2">
                                <span className="fw-semibold">etiquetas</span>
                            </DropdownCheck>
                        </FilterBar>
                    </Card>
                    {/* Table */}
                    <ListingCrudTable />

                </div>

                {/* Wizard */}
                <div className={` wizardCrudCol ${expandx ? ' active' : ''}`}>
                    <div
                        style={{top: '60px'}}
                        className="m-0 my-2 ms-lg-2 sticky-top rounded border p-4 island"
                    >
                        <ListingCrudWizard />
                    </div>
                </div>
            </div>
        </Container>
    )

}

export default ListingCrudNext;
