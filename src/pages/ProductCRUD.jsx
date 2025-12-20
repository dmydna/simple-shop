import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { productService } from '../services/productService';


const ProductCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [currentItem, setCurrentItem] = useState({ name: "", description: "" });


  // Carga inicial
    useEffect(() => {
    const fetchItems = async () => {
        try {
            const data = await productService.getAll();
            setItems(data.products ? data.products : data);
        } catch (err) {
           console.error("Error de carga de API", err);
        } finally {
            setLoading(false);
        }
    };
    fetchItems() ;
    }, []);


  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => 
    {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  //Esta función envía un nuevo item a la API usando POST, luego actualiza la lista de items y cierra el modal si todo sale bien. 
  // Si ocurre un error, muestra una alerta y lo registra en la consola.
  const handleCreate = async () => {
    const productData = currentItem;
    try {
      await productService.create(productData)
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      alert("Error creando item");
      console.error(error);
    }
  };



  const handleUpdate = async () => {
    const id = currentItem.id;
    const updatedData = currentItem;
    try {
        await productService.update(id, updatedData);
        await fetchItems();
        handleCloseModal();
    } catch (err) {
      alert("Error actualizando item");
      console.error(error);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este item?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        await fetchItems();
      } catch (error) {
        alert("Error eliminando item");
        console.error(error);
      }
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentItem({ name: "", description: "" });
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
      <h1>Dashboard</h1>

      <Button variant="primary" onClick={openCreateModal} className="mb-3">
        Crear nuevo item
      </Button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay items
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese descripción"
                name="description"
                value={currentItem.description}
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
            disabled={!currentItem.name || !currentItem.description}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductCRUD;