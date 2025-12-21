import React from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';

function ProductCreateModal({showModal, handleChange, handleCloseModal, handleUpdate, handleCreate, currentItem, modalMode}){


return ( 

<Container>
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
            disabled={!currentItem.title || !currentItem.description}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    )
}

export default ProductCreateModal;