import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Form, Modal,InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductTable from "../components/product//ProductTable.jsx";
import FilterSearch from "../components/search/FilterSearch.jsx";
import SearchLive from "../components/search/SearchLive.jsx";
import { useProducts } from "../contexts/ProductContext.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { handleCreateAll } from "../dev/loadProductDataList.js";
import { productService } from '../services/productService.js';
import { CRUD } from "../components/common/crudUtils.js";
import ProductFormCrud from "../components/product/ProductFormCrud.jsx";

const ProductCRUD = () => {

  const {onHideFilter} =  useUIContext();
  const {fetchData, filtered, products, setSearch ,loading, filterDraft, setActiveFilters, setFilterDraft, setResetFilter} = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(CRUD.CREATE); 
  const [currentItem, setCurrentItem] = useState({ name: "", price:0.0 , stock:0 });
  const [editableFields, setEditableFields] = useState({});
  

  // Carga inicial
  useEffect(() => {
    onHideFilter(true);
    handleCreateAll()
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
      product_name: currentItem.product_name,
      price: parseFloat(currentItem.price),
      stock: parseInt(currentItem.stock, 10),
      discountPercentage: parseFloat(currentItem.discountPercentage),
      weight: parseInt(currentItem.weight, 10),
      category: currentItem.category
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
    setEditableFields({})
  };



  const handleEnableEdit = (fieldName) => {
    setEditableFields(prev => ({
      ...prev,
      [fieldName]: true // Se activa y no se desactiva con el mismo botón
    }));
  };

  return (
    <Container className="mt-4">
      
      <div className="w-100 d-flex flex-wrap mt-2 mb-4">
         <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
         <i class="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted" style={{opacity: '.6', background: ''}}></i>
         <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
            Dashboard
         </span>
         </Link>
         <span style={{lineHeight: '2.3rem'}} className="text-secondary">
          Administra tus productos
         </span>
      </div>

      
      <Button variant="primary" onClick={openCreateModal} className="mb-5">
        <i className="bi bi-plus-lg"></i>
        <span className="ms-2">Crear nuevo item</span>
      </Button>

      <FilterSearch  
          order="order-1"
          className="d-block" 
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
      <ProductTable  
         openEditModal={openEditModal} 
         handleDelete={handleDelete}
       />


      {/*  Modal CRUD  */} 

      <ProductFormCrud 
        showModal = {showModal} 
        handleCloseModal = {handleCloseModal}
        modalMode    = {modalMode}
        currentItem  = {currentItem}
        handleChange = {handleChange}
        handleCreate = {handleCreate}
        handleUpdate = {handleUpdate}
        handleEnableEdit= {handleEnableEdit}
        editableFields= {editableFields}
      />
      
    </Container>
  );
};


export default ProductCRUD;
