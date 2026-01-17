import React, { useMemo } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { CRUD } from "../../enums/crudUtils.js";


const ProductFormCrud = ({ showModal, handleCloseModal, modalMode, currentItem, handleChange, handleCreate, handleUpdate, handleEnableEdit, editableFields }) => {

  const modeActions = useMemo(() => {
    switch (modalMode) {
      case CRUD.CREATE: return "Crear"
      case CRUD.UPDATE: return "Actualizar"
      case CRUD.READ: return "Ver"
      case CRUD.DELETE: return "Eliminar"
    }
  }, [modalMode])

  // Estado inicial: todos los campos cerrados

  return (
    <Modal size="md" fullscreen="md-down" backdrop="static" show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>
          {modalMode === CRUD.CREATE && (
            <>
              <i style={{ opacity: '.6' }} className="bi bi-send me-3"></i>
              <span>Crear nuevo producto</span>
            </>
          )}
          {modalMode == CRUD.READ && (
            <>
              <i style={{ opacity: '.6' }} className="bi bi-eye me-3"></i>
              <span>Visualizar producto</span>
            </>
          )}
          {modalMode == CRUD.UPDATE && (
            <>
              <i style={{ opacity: '.6' }} className="bi bi-pencil-square me-3"></i>
              <span>Editar producto</span>
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
              <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                Nombre
              </InputGroup.Text>
              <Form.Control
                style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                className="border-0 no-arrows"
                spellCheck="false"
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
                disabled={!editableFields["name"]}
              />
              <InputGroup.Text
                className="fw-semibold border-0 text-muted px-3"
                style={{
                  fontSize: "0.95rem", 
                  backgroundColor: 'rgb(233, 236, 239)', 
                  cursor: editableFields["name"] ? 'default' : 'pointer'
                }}
                onClick={() => handleEnableEdit("name")}
              >
                <i className={`bi ${editableFields["name"] ? "bi-check text-primary" : "bi-pencil"}`}
                  style={{ opacity: '.8' }}>
                </i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>


          <div className="d-flex gap-2 mb-3">
            <Form controlId="formBrandProduct">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                {/* <Form.Label>Marca</Form.Label> */}
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  Marca:
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  spellCheck="false"
                  type="text"
                  placeholder="Ingrese marca"
                  name="brand"
                  value={currentItem.brand}
                  onChange={handleChange}
                  disabled={!editableFields["brand"]}
                />
                <InputGroup.Text
                  className="fw-semibold border-0 text-muted px-3"
                  style={{
                    fontSize: "0.95rem", backgroundColor: 'rgb(233, 236, 239)', cursor: editableFields["brand"] ? 'default' : 'pointer'
                  }}
                  onClick={() => handleEnableEdit("brand")}
                >
                  <i className={`bi ${editableFields["brand"] ? "bi-check text-primary" : "bi-pencil"}`}
                    style={{ opacity: '.8' }}>
                  </i>
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <Form.Group controlId="formSkuProduct">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  sku:
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  spellCheck="false"
                  type="text"
                  placeholder="Ingrese sku"
                  name="sku"
                  value={currentItem.sku}
                  onChange={handleChange}
                  disabled={!editableFields["sku"]}
                />
                <InputGroup.Text
                  className="fw-semibold border-0 text-muted px-3"
                  style={{
                    fontSize: "0.95rem", backgroundColor: 'rgb(233, 236, 239)', cursor: editableFields["sku"] ? 'default' : 'pointer'
                  }}
                  onClick={() => handleEnableEdit("sku")}
                >
                  <i className={`bi ${editableFields["sku"] ? "bi-check text-primary" : "bi-pencil"}`}
                    style={{ opacity: '.8' }}>
                  </i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>


          <div className="d-flex gap-2">
            <Form.Group className="mb-3" controlId="formStock">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  stock:
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  type="number"
                  rows={3}
                  placeholder="Ingrese un stock"
                  name="stock"
                  value={currentItem.stock}
                  onChange={handleChange}
                  disabled={!editableFields["stock"]}
                />
                <InputGroup.Text
                  className="fw-semibold border-0 text-muted px-3"
                  style={{
                    fontSize: "0.95rem", backgroundColor: 'rgb(233, 236, 239)', cursor: editableFields["stock"] ? 'default' : 'pointer'
                  }}
                  onClick={() => handleEnableEdit("stock")}
                >
                  <i className={`bi ${editableFields["stock"] ? "bi-check text-primary" : "bi-pencil"}`}
                    style={{ opacity: '.8' }}>
                  </i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWeight">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  peso:
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  type="weight"
                  rows={3}
                  placeholder="Ingrese un peso"
                  name="weight"
                  value={currentItem.weight}
                  onChange={handleChange}
                  disabled={!editableFields["weight"]}
                />
                <InputGroup.Text
                  className="fw-semibold border-0 text-muted px-3"
                  style={{
                    fontSize: "0.95rem", backgroundColor: 'rgb(233, 236, 239)', cursor: editableFields["weight"] ? 'default' : 'pointer'
                  }}
                  onClick={() => handleEnableEdit("weight")}
                >
                  <i className={`bi ${editableFields["weight"] ? "bi-check text-primary" : "bi-pencil"}`}
                    style={{ opacity: '.8' }}>
                  </i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>

          <Form.Group controlId="formBrandProduct">
            <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
              <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                categoria:
              </InputGroup.Text>
              <Form.Control
                style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                className="border-0 no-arrows"
                spellCheck="false"
                type="text"
                placeholder="Ingrese categoria"
                name="category"
                value={currentItem.category}
                onChange={handleChange}
                disabled={!editableFields["category"]}
              />
              <InputGroup.Text
                className="fw-semibold border-0 text-muted px-3"
                style={{
                  fontSize: "0.95rem", backgroundColor: 'rgb(233, 236, 239)', cursor: editableFields["category"] ? 'default' : 'pointer'
                }}
                onClick={() => handleEnableEdit("category")}
              >
                <i className={`bi ${editableFields["category"] ? "bi-check text-primary" : "bi-pencil"}`}
                  style={{ opacity: '.8' }}>
                </i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          {modalMode == CRUD.READ ? 'Salir' : 'Cancelar'}
        </Button>
        <Button
          className={modalMode == CRUD.READ ? 'd-none' : ''}
          variant="primary"
          onClick={modalMode === CRUD.CREATE ? handleCreate : handleUpdate}
          disabled={!currentItem.name}
        >
          {modeActions}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductFormCrud;