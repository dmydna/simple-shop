import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import SearchLive from "../../features/search/SearchLive.jsx";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";
import { useUIContext } from "../../contexts/UIContext.jsx";
import "../../styles/animations.css"
import "../../styles/dashboard.css"
import CrudHeader from "../../components/common/CrudHeader.jsx";
import UserCrudTable from "../../features/user/components/UserCrudTable.jsx";
import UserCrudWizard from "../../features/user/components/UserCrudWizard.jsx";
import { useUserCrud } from "../../features/user/contexts/UserCrudContext.jsx"
import { useUserContext } from "../../features/user/contexts/UserContext.jsx";


function UserCrudNext() {

    const { users, setFilters } = useUserContext()
    const { onHideFilter } = useUIContext();
    const { expandx, openCreate: openCreateModal } = useUserCrud()

    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()

    // Carga inicial

    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])

    useEffect(() => {
        onHideFilter(true);
        if (!isCreating) { setIsCreating(true) }
    }, []);


    return (

        <Container fluid="xl" className={`mt-4`}
        >
            <CrudHeader
                title="usuarios"
                subtitle="administra tus usuarios"
            />

            <div className='d-flex'>


                {/* Table y filter */}
                <div className={`tableCrudCol 
                ${expandx ? 'active' : ''}`}>
                    {/* Filter */}
                    <Card className="m-0 my-2 ms-lx-2 p-4 border island" >
                        <div className="d-flex gap-3 flex-wrap">
                            <SearchLive
                                className='flex-fill'
                                items={users}
                                handleSearch={setSearch}
                            />
                            <Button
                                variant="primary w-md-100"
                                onClick={openCreateModal}
                                className="my-2 disabled">
                                <i className="bi bi-plus-lg"></i>
                                <span className="ms-2">Create new</span>
                            </Button>
                        </div>

                    </Card>
                    {/* Table */}
                    <UserCrudTable />

                </div>

                {/* Wizard */}
                <div className={` wizardCrudCol ${expandx ? ' active' : ''}`}>
                    <div
                        style={{ top: '60px' }}
                        className="m-0 my-2 ms-lg-2 sticky-top rounded border p-4 island"
                    >
                        <UserCrudWizard />
                    </div>
                </div>
            </div>
        </Container>
    )

}

export default UserCrudNext;
