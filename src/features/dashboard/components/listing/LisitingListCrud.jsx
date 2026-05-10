import { useListing } from "@/features/listing/hooks/useListing";
import SearchLive from "@/features/search/SearchLive";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCrud from "../../../crud/components/ModalCrud";
import ListingFilterCrud from "./ListingFilterCrud";
import ListingListConfig from "./ListingListConfig";
import { ListingTable } from "./ListingTable";

export const ListingListCrud = ({ currentItem, setCurrentItem }) => {

    const baseHook = useListing()
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const [showCrudActions, setShowCrudActions] = useState()
    const [showFilter, setShowFilter] = useState()


    useEffect(() => {
        if (search) setFilters({ page: 0, title: search })
    }, [search])

    const { setFilters, listings } = baseHook;


    const handleOpenEdit = (item) => {
        setCurrentItem(item)
        setShowCrudActions(true)
    }

    const handleclick = (item) => {
        console.log(item)
        if(currentItem && currentItem.id == item.id){
            setCurrentItem({})
        }else{
            setCurrentItem(item)
        }
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
                                        <ListingFilterCrud
                                            show={showFilter}
                                            onHide={setShowFilter}
                                            dataSource={listings}
                                            onApply={setFilters}
                                        ></ListingFilterCrud>
                                    </div>

                    <ListingTable
                        className=''
                        currentItem={currentItem}
                        baseHook={baseHook}
                        handleclick={handleclick}
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
                <ListingListConfig
                    close={() => setShowCrudActions(false)}
                    item={currentItem}
                />
            </ModalCrud>


        </>

    );
}

export default ListingListCrud;
