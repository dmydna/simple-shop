import { useState } from "react";
import { Form } from "react-bootstrap";
import { useProductCrudContext } from "../contexts/ProductCrudContex";


function FormCategory({ children, className }) {

    const { dataItem, handleChange, crudMode, setFormData, formData,
        isDisabledField, handleEnableEdit, editableFields, currentProduct } = useProductCrudContext();

    const [selected, setSelected] = useState('4');


    return (
        <>
            {/* Producto.Category */}

            <>

                <p className="fw-medium"> Category: </p>

                <Form.Select>
                    <option value="">Selecciona una opción</option>
                    <option value="1">groceries</option>
                    <option value="2">furnitures</option>
                    <option value="3">beauty</option>
                    <option value="1">fagrances</option>
                </Form.Select>
            </>

        </>
    )
}
export default FormCategory
