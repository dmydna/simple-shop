import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable.jsx";
import FilterSearch from "../components/search/FilterSearch.jsx";
import SearchLive from "../components/search/SearchLive.jsx";
import { useListings } from "../contexts/ListingContext.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { handleCreateAll } from "../dev/loadProductDataList.js";
import { listingService as productService } from '../services/listingService.js';
import  ListingFormCrud  from '../components/listing/ListingFormCrud.jsx'
import { CRUD } from "../components/common/crudUtils.js";

const ListingCRUD = () => {


  const {setItems, setItemsPerPage, currentItems, setCurrentPage } = useUIContext();

  const {onHideFilter} =  useUIContext();
  const {fetchData, filtered, products, setSearch ,loading, filterDraft, setActiveFilters, setFilterDraft, setResetFilter} = useListings(); 
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [currentItem, setCurrentItem] = useState({ title: "", description: "", precio:0.0, stock:0 });
  
  const [showInfo, setShowInfo] = useState(false);
  const [showCurrent, setShowCurrent] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Carga inicial

  useEffect(() => {
    onHideFilter(true);
    if(!isCreating){
      handleCreateAll()
      setIsCreating(true)
    }
  }, []);



  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setCurrentItem({ ...currentItem, [name]: val });
  };

  //Esta función envía un nuevo item a la API usando POST, luego actualiza la lista de items y cierra el modal si todo sale bien. 
  // Si ocurre un error, muestra una alerta y lo registra en la consola.
  const handleCreate = async () => {
    const productData = currentItem;
    try {
      await productService.create(productData)
      await fetchData();
      handleCloseModal();
    } catch (error) {
      alert("Error creando item");
      console.error(error);
    }
  };


  const handleUpdate = async () => {
    const id = currentItem.id;
    // const updatedData = currentItem;

    const updatedData = {
      ...currentItem,
      price: parseFloat(currentItem.price),
      stock: parseInt(currentItem.stock, 10),
      discountPercentage: parseFloat(currentItem.discountPercentage),
      weight: parseInt(currentItem.weight, 10),
    };

    try {
        await productService.update(id, updatedData);
        await fetchData();
        handleCloseModal();
    } catch (err) {
      alert("Error actualizando item");
      console.error(err);
    }
  };

  const handleRead = async (item) => {
    setModalMode(CRUD.READ);
    setShowModal(true);
    setCurrentItem(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este item?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        await fetchData();
      } catch (error) {
        alert("Error eliminando item");
        console.error(error);
      }
    }
  };

  const openCreateModal = () => {
    setModalMode(CRUD.CREATE);
    setCurrentItem({ title: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode(CRUD.UPDATE);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Container className="mt-4">
      
    <div className="w-100 d-flex flex-wrap mt-2 mb-4">
         <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
         <i class="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted" 
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

      <FilterSearch  order="order-1" className="d-block" 
          items={products} 
          filterDraft={filterDraft} 
          onFilterDraft={setFilterDraft} 
          onActiveFilters={setActiveFilters} 
          onResetFilter={setResetFilter}>
          <SearchLive 
             items={products}
             handleSearch={setSearch}
          />
      </FilterSearch>


     {/*  TABLE GET ALL  */} 
      <ListingTable  
         openEditModal={openEditModal} 
         handleDelete={handleDelete}
         handleRead={handleRead}
       />


      {/*  Modal CRUD  */} 
      <ListingFormCrud
         showModal = {showModal}
         handleCloseModal = {handleCloseModal}
         modalMode    = {modalMode}
         currentItem  = {currentItem}
         handleChange = {handleChange}
         handleUpdate = {handleUpdate} 
         handleCreate = {handleCreate}
         handleRead   = {handleRead}
         onCurrentItem= {setCurrentItem}
      />
      
    </Container>
    </>
  );
};


export default ListingCRUD;
