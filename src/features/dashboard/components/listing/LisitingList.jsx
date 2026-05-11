import { useListing } from "@/features/listing/hooks/useListing";
import SearchLive from "@/features/search/SearchLive";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCrud from "../../../crud/components/ModalCrud";
import ListingActions from "./ListingActions";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";

export const ListingList = ({}) => {

    const baseHook = useListing()
    const {listings, setFilters} = baseHook
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const [showCrudActions, setShowCrudActions] = useState()
    const [showFilter, setShowFilter] = useState()



    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])


    const handleOpenEdit = (item) => {
        setShowCrudActions(true)
    }

    return (
        <>
            <div className="mb-3 mx-0 mx-md-2">

                <div className="mx-auto p-4 rounded island border">

<div>
                                        <div>
                                            <p className="h5 mb-3">
                                                Publicaciones
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between my-4 flex-wrap" >
                                            <Button
                                                variant="light"
                                                onClick={() => navigate('/dashboard/listing-crud?edit=false')}
                                                className="my-2 flex-fill flex-md-grow-0">
                                                <i className="bi bi-plus-lg"></i>
                                                <span className="fw-medium ms-2">Create new</span>
                                            </Button>
                                            <SearchLive
                                                className='flex-fill flex-md-grow-0'
                                                items={listings}
                                                handleSearch={setSearch}
                                                handleFilter={() => setShowFilter(prev => !prev)}
                                            />

                                        </div>
                                        <ListingFilter
                                            show={showFilter}
                                            onHide={setShowFilter}
                                            dataSource={listings}
                                            onApply={setFilters}
                                        ></ListingFilter>
                                    </div>

                    <ListingTable
                        className=''
                        baseHook={baseHook}
                    >
                        {(key, item) => {
                            if (key === 'title') {
                                return (
                                    <></>
                                )
                            }
                            if (key === 'buttons') {
                                return (
                                    <>  {/** Editar */}
                                        <Button
                                            variant="border-0 ligth"
                                            size="sm"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            <i className="bi bi-three-dots h5"></i>
                                        </Button>

                                    </>
                                )
                            }

                        }}
                    </ListingTable>
                </div>
            </div>


            <ModalCrud
                show={showCrudActions}
                onHide={setShowCrudActions}
            >
                <ListingActions
                    close={() => setShowCrudActions(false)}
                />
            </ModalCrud>


        </>

    );
}

export default ListingList;
