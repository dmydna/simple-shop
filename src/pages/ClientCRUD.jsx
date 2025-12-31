import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import FilterSearch from "../components/FilterSearch.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ProductViewModal from "../components/ProductViewModal.jsx";
import SearchLive from "../components/SearchLive.jsx";
import { useProducts } from "../contexts/ProductContext.jsx";
import { useUIContext } from "../contexts/UIContext.jsx";
import { handleCreateAll } from "../dev/loadProductDataList.js";
import { clientService } from '../services/clientService.js';
import ClientTable from "../components/ClientTable.jsx";
import { useClients } from "../contexts/ClientContext.jsx";
import { Link } from "react-router-dom";
import ClientViewModal from "../components/ClientViewModal.jsx";


const ClientCRUD = () => {

    const {onHideFilter, currentItems} =  useUIContext();
    const {fetchData, setSearch ,clients, filtered} = useClients();
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); 
    const [currentItem, setCurrentItem] = useState({ name: "", email: ""});
    
    const [showInfo, setShowInfo] = useState(false);
    const [showCurrent, setShowCurrent] = useState(null)



    const handleChange = (e) => {
      const { name, value, type } = e.target;
      const val = type === 'number' ? Number(value) : value;
      setCurrentItem({ ...currentItem, [name]: val });
    };

    const handleCreate = async () => {
        const clientData = currentItem;
        try {
          await clientService.create(clientData)
          await fetchData();
          handleCloseModal();
        } catch (error) {
          alert("Error creando item");
          console.error(error);
        }
    };

    const handleInfo = async (item) => {
        setShowInfo(true);
        setShowCurrent(item);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que quieres eliminar este item?")) {
          try {
            await clientService.delete(clientData)
            await fetchData();
          } catch (error) {
            alert("Error eliminando item");
            console.error(error);
          }
        }
      };

      const handleUpdate = async () => {
        const updatedData = currentItem;
        const id = currentItem.id;
        try {
            await clientService.update(id, updatedData);
            await fetchData();
            handleCloseModal();
        } catch (err) {
          alert("Error actualizando item");
          console.error(err);
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
    


    return(
     <Container className="mt-4">
          
        <div className="w-100 d-flex flex-wrap mt-2 mb-4">
            <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
            <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
               Dashboard
            </span>
            </Link>
            <span style={{lineHeight: '2.3rem'}} className="text-secondary">
             Administra tus clientes
            </span>
        </div>


            <div className="mb-4">
               <SearchLive  
                    items={clients}
                    handleSearch={setSearch} 
               />
            </div>


        <ClientTable  
              openEditModal={openEditModal} 
              handleDelete={handleDelete}
              handleInfo={handleInfo}
        />

        <ClientViewModal 
           client={showCurrent} 
           show={showInfo} 
           onHide={setShowInfo} 
        />

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear nuevo item" : "Editar item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                spellCheck="false"
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Email</Form.Label>
              <Form.Control
                spellCheck="false"
                as="textarea"
                rows={3}
                placeholder="Ingrese descripción"
                name="email"
                value={currentItem.email}
                onChange={handleChange}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modalMode === "create" ? handleCreate : handleUpdate}
            disabled={!currentItem.name || !currentItem.email}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
     </Modal>


    </Container>
    )

}


export default ClientCRUD;