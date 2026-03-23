import { Form, InputGroup } from "react-bootstrap";
import { CRUD } from "../../../utils/crud.js";
import { useProductCrud } from "../contexts/ProductCrudContex.jsx";


function FormProduct({children, className}){

    const {dataItem, handleChange, crudMode,
      isDisabledField, handleEnableEdit, editableFields} = useProductCrud();

    return (
        <>
            {/* Producto */}

            {children}
            
            <>
              <Form.Group className={`mb-3 ${className || ''}`} controlId="formNameProduct">
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
                    name="productName"
                    value={dataItem.name || undefined}
                    onChange={handleChange}
                    disabled={isDisabledField("name")}
                    />
                    {crudMode != CRUD.CREATE && (
                    <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["productName"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("name")}
                  >
                    <i className={`bi ${editableFields["productName"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                    )}

                </InputGroup>
              </Form.Group>
              <div className="d-flex gap-2">
                <Form.Group controlId="formBrandProduct">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Marca
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      spellCheck="false"
                      type="text"
                      placeholder="Ingrese marca"
                      name="brand"
                      value={dataItem.brand}
                      onChange={handleChange}
                      disabled={isDisabledField("brand")}
                      />
                      {crudMode != CRUD.CREATE && (
                      <InputGroup.Text
                      className="fw-semibold border-0 text-muted px-3"
                      style={{
                        fontSize: "0.95rem", 
                        backgroundColor: 'rgb(233, 236, 239)', 
                        cursor: editableFields["brand"] ? 'default' : 'pointer'
                      }}
                      onClick={() => handleEnableEdit("brand")}
                    >
                      <i className={`bi ${editableFields["brand"] ? "bi-check text-primary" : "bi-pencil"}`}
                        style={{ opacity: '.8' }}>
                      </i>
                    </InputGroup.Text>
                      )}

                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formSkuProduct">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      sku
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      spellCheck="false"
                      type="text"
                      placeholder="Ingrese sku"
                      name="sku"
                      value={dataItem.sku}
                      onChange={handleChange}
                      disabled={isDisabledField("sku")}
                      />

                      {crudMode != CRUD.CREATE  && (
                      <InputGroup.Text
                        className="fw-semibold border-0 text-muted px-3"
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["sku"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("sku")}
                      >
                        <i className={`bi ${editableFields["sku"] ? "bi-check text-primary" : "bi-pencil"}`}
                            style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                    </InputGroup>
                </Form.Group>

              </div>
              <div className="d-flex gap-2 mb-3">

              <Form.Group className="mt-3" controlId="formStockProducto">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Stock
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      type="number"
                      rows={3}
                      placeholder="Ingrese peso"
                      name="stock"
                      value={dataItem.stock}
                      onChange={handleChange}
                      disabled={isDisabledField("stock")}
                      />
                      {crudMode != CRUD.CREATE && (
                      <InputGroup.Text
                        className={`${crudMode == CRUD.CREATE ? 'd-none' : ''} fw-semibold border-0 text-muted px-3`}
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["stock"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("stock")}
                      >
                        <i className={`
                        bi ${editableFields["stock"] ? "bi-check text-primary" : "bi-pencil"}`}
                          style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formWeightProducto">
                  <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                    <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                      Peso
                    </InputGroup.Text>
                    <Form.Control
                      style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                      className="border-0 no-arrows"
                      type="number"
                      rows={3}
                      placeholder="Ingrese peso"
                      name="weight"
                      value={dataItem.weight}
                      onChange={handleChange}
                      disabled={isDisabledField("weight")}
                      />
                      {crudMode != CRUD.CREATE && (
                      <InputGroup.Text
                        className={`${crudMode == CRUD.CREATE ? 'd-none' : ''} fw-semibold border-0 text-muted px-3`}
                        style={{
                          fontSize: "0.95rem", 
                          backgroundColor: 'rgb(233, 236, 239)', 
                          cursor: editableFields["weight"] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit("weight")}
                      >
                        <i className={`
                        bi ${editableFields["weight"] ? "bi-check text-primary" : "bi-pencil"}`}
                          style={{ opacity: '.8' }}>
                        </i>
                      </InputGroup.Text>
                      )}
                  </InputGroup>
                </Form.Group>
              </div>
            </>

            <Form.Group  className="mb-3" controlId="formBrandCategory">
              <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                  Categoria
                </InputGroup.Text>
                <Form.Control
                  style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                  className="border-0 no-arrows"
                  spellCheck="false"
                  type="text"
                  placeholder="Ingrese categoria"
                  name="category"
                  value={dataItem.category}
                  onChange={handleChange}
                  disabled={isDisabledField("category")}
                  />
                  {crudMode != CRUD.CREATE && (
                  <InputGroup.Text
                    className="fw-semibold border-0 text-muted px-3"
                    style={{
                      fontSize: "0.95rem", 
                      backgroundColor: 'rgb(233, 236, 239)', 
                      cursor: editableFields["category"] ? 'default' : 'pointer'
                    }}
                    onClick={() => handleEnableEdit("category")}
                  >
                    <i className={`bi ${editableFields["category"] ? "bi-check text-primary" : "bi-pencil"}`}
                      style={{ opacity: '.8' }}>
                    </i>
                  </InputGroup.Text>
                  )}
              </InputGroup>
            </Form.Group>


          </>
    )
}
export default FormProduct