import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import FilterSearch from "../components/FilterSearch.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ProductViewModal from "../components/ProductViewModal.jsx";
import SearchLive from "../components/SearchLive.jsx";
import { useProducts } from "../contexts/ProductContext.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { handleCreateAll } from "../dev/loadProductDataList.js";
import { productService } from '../services/productService.js';

const ProductCRUD = () => {


  const {setItems, setItemsPerPage, currentItems, setCurrentPage } = useUIContext();

  const {onHideFilter} =  useUIContext();
  const {fetchData, filtered, products, setSearch} = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [currentItem, setCurrentItem] = useState({ title: "", description: "", precio:0.0, stock:0 });
  
  const [showInfo, setShowInfo] = useState(false);
  const [showCurrent, setShowCurrent] = useState(null)

  // Carga inicial

  useEffect(() => {

    // setItemsPerPage(3)
    // setItems(filtered)
    // setCurrentPage(1);
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

  const handleInfo = async (item) => {
        setShowInfo(true);
        setShowCurrent(item);
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
    setModalMode("create");
    setCurrentItem({ title: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      
      <div className="w-100 d-flex flex-wrap mt-2 mb-4">
         <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
            Dashboard
         </span>
         <span style={{lineHeight: '2.3rem'}} className="text-secondary">
          Administra tus publicaciones
         </span>
       </div>

      
      <Button variant="primary" onClick={openCreateModal} className="mb-5">
        <i class="bi bi-plus-lg"></i>
        <span className="ms-2">Crear nuevo item</span>
      </Button>

      <FilterSearch  order="order-1" className="d-block" >
          <SearchLive 
             items={products}
             handleSearch={setSearch}
          />
      </FilterSearch>


     {/*  TABLE GET ALL  */} 
      <ProductTable  
         openEditModal={openEditModal} 
         handleDelete={handleDelete}
         handleInfo={handleInfo}
       />


      {/*  Modal READ  */} 
      <ProductViewModal 
         product={showCurrent} 
         show={showInfo} 
         onHide={setShowInfo} 
      />

      {/*  Modal CRUD  */} 
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear nuevo item" : "Editar item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                spellCheck="false"
                type="text"
                placeholder="Ingrese nombre"
                name="title"
                value={currentItem.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                spellCheck="false"
                as="textarea"
                rows={3}
                placeholder="Ingrese descripción"
                name="description"
                value={currentItem.description}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="mb-3 d-flex gap-5">
                 <Form.Group className="mb-3" controlId="formPrice">
                   <Form.Label>Precio</Form.Label>
                   <Form.Control
                     type="number"
                     rows={3}
                     placeholder="Ingrese un precio"
                     name="price"
                     value={currentItem.price}
                     onChange={handleChange}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="formStock">
                   <Form.Label>Stock</Form.Label>
                   <Form.Control
                     type="number"
                     rows={3}
                     placeholder="Ingrese un stock"
                     name="stock"
                     value={currentItem.stock}
                     onChange={handleChange}
                   />
                 </Form.Group>
            </div>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modalMode === "create" ? handleCreate : handleUpdate}
            disabled={!currentItem.title || !currentItem.description}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};


export default ProductCRUD;
