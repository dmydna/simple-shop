import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListingFormCrud from '../components/listing/ListingForm/ListingFormCrud.jsx';
import ListingTable from "../components/listing/ListingTable.jsx";
import SearchFilter from "../components/search/SearchFilter.jsx";
import SearchLive from "../components/search/SearchLive.jsx";
import { useListings } from "../contexts/ListingContext.jsx";
import { useListingsForm } from "../contexts/ListingFormContext.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { CRUD } from "../utils/crud.js";


const ListingCRUD = () => {


  const {onHideFilter} =  useUIContext();
  

  const { listings, setFilters, filters } = useListings()

  const {showModal, setShowModal,modalMode, setModalMode,currentItem, setCurrentItem, editableFields, setEditableFields, handleChange, handleCreate, handleUpdate, handleDelete } = useListingsForm()

  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState()

  // Carga inicial

  useEffect(()=>{
    setFilters({page:0, title: search })
    console.log(filters)
  }, [search])

  useEffect(() => {
    onHideFilter(true);
    if(!isCreating){
      setIsCreating(true)
    }
  }, []);


  const handleSearch = () => {
    set
  }

  const openCreateModal = () => {
    setModalMode(CRUD.CREATE);
    setCurrentItem({ title: "", description: "" });
    setShowModal(true);
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

      
      <Button variant="primary" onClick={openCreateModal} className="mb-5">
        <i className="bi bi-plus-lg"></i>
        <span className="ms-2">Crear nuevo item</span>
      </Button>

      <SearchFilter  order="order-1" className="d-block" >
          <SearchLive
             items={listings}
             handleSearch={setSearch}
          />
      </SearchFilter>


     {/*  TABLE GET ALL  */} 
      <ListingTable  />
      {/*  Modal CRUD  */} 
      <ListingFormCrud />
      
    </Container>
    </>
  );
};


export default ListingCRUD;
