import { useState } from "react";
import { Form } from "react-bootstrap";
import { useProductCrudContext } from "../contexts/ProductCrudContex";

// TODO no funciona
function FormCategory({ children, className, crudHook }) {

    const { dataItem, handleChange, crudMode, setFormData, formData,
        isDisabledField, handleEnableEdit, editableFields, currentProduct } = crudHook;

    const [selected, setSelected] = useState('4');


    return (
        <>
            {/* Producto.Category */}

            <div className="mb-4">

                <p className="fw-medium"> Category: </p>

                <Form.Select>
                    <option value="">Selecciona una opción</option>
                    <option value="1">groceries</option>
                    <option value="2">furnitures</option>
                    <option value="3">beauty</option>
                    <option value="1">fagrances</option>
                </Form.Select>
            </div>

        </>
    )
}
export default FormCategory
