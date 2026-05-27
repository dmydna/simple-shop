import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ListingCrudTable from "../../features/listing/components/ListingCrudTable.jsx";
import FilterBar from "../../features/filters/components/FilterBar.jsx";
import SearchLive from "../../features/search/SearchLive.jsx";
import { useListingContext } from "../../features/listing/contexts/ListingContext.jsx";
import { useListingCrud } from "../../features/listing/contexts/ListingCrudContext.jsx";
import { useUIContext } from "../../contexts/UIContext.jsx";
import { CRUD } from "../../utils"@utils/enums.js";
import DropdownCheck from "../../components/common/DropdownCheck.jsx";



const ListingCRUD = () => {

    const navigate = useNavigate();
    const {onHideFilter} =  useUIContext();


    const { listings, setFilters } = useListingContext()


    const { setShowModal, setModalMode, setCurrentItem,
        handleDelete, handleVisibility } = useListingCrud()

    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()

    // Carga inicial

    useEffect(()=>{
        if(search)  setFilters({page:0, title: search })
    }, [search])

    useEffect(() => {
        onHideFilter(true);
        if(!isCreating){
            setIsCreating(true)
        }
    }, []);


    const openCreateModal = () => {
        setModalMode(CRUD.CREATE);
        setCurrentItem({ title: "", description: "" });
        setShowModal(true);
        navigate('/panel/welcome')
    };

    const openEditModal = (item) => {
        setModalMode(CRUD.UPDATE);
        setCurrentItem(item);
        setShowModal(true);
        navigate('/panel/welcome')
    };


    return (
        <>
            <Container className="mt-4">

                <div className="w-100 d-flex flex-wrap mt-2 mb-4">
                    <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
                        <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted"
                           style={{opacity: '.6', background: ''}}></i>
                        <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
            Dashboard
         </span>
                    </Link>
                    <span style={{lineHeight: '2.3rem'}} className="text-secondary">
          Administra tus publicaciones
         </span>
                </div>

                <div className="d-flex flex-wrap justify-content-between my-2 p-4 island border">
                    <FilterBar dataSource={listings} onApply={setFilters} className="d-block" >
                        <Button variant="primary" onClick={openCreateModal} className="my-2">
                            <i className="bi bi-plus-lg"></i>
                            <span className="ms-2">Create new</span>
                        </Button>
                        <SearchLive items={listings} handleSearch={setSearch} />
                        <DropdownCheck variant="light"  className="border rounded my-2">
                            <span className="fw-semibold">etiquetas</span>
                        </DropdownCheck>
                    </FilterBar>
                </div>
                <ListingCrudTable>

                    { (key, item) => {
                        if(key == 'buttons'){
                            return (
                                <>  {/** Editar */}
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => openEditModal(item)}
                                        className="me-3 mb-1 border"
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    {/** Delete */}
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => handleDelete(item.id)}
                                        className="me-3 mb-1 border"
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </Button>
                                    {/** Visibility */}
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleVisibility(item)}
                                        className="mb-1 border"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </Button>

                                </>
                            )
                        }
                    }}

                </ListingCrudTable>

            </Container>
        </>
    );
};


export default ListingCRUD;
