import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useProductCrudContext } from "../contexts/ProductCrudContex";
import { category } from "@/utils/enums";
import InputCrudFloating from "@/features/crud/components/InputCrudFloating";


function FormCategory({ children, className, crudHook }) {

    const { dataItem, handleChange, crudMode, setFormData, formData,
        isDisabledField, handleEnableEdit, editableFields, currentProduct } = crudHook;


    useEffect(() => {
        console.log(formData?.category)
    }, [formData])

    return (
        <>
            {/* Producto.Category */}

            <div className="mb-4">

                <p className="fw-medium"> Category: </p>


               {editableFields["category"] && (
                <Form.Select className="p-3" name="category" value={formData?.category} onChange={handleChange}>
                    <option value="">Selecciona una opción</option>
                    <option value={category.GROCERIES}>groceries</option>
                    <option value={category.FURNITURE}>furnitures</option>
                    <option value={category.BEAUTY}>beauty</option>
                    <option value={category.FRAGRANCE}>fagrances</option>
                </Form.Select>
               )}
               {!editableFields["category"] && (
                <InputCrudFloating
                    name={"category"}
                    label={"Category"}
                    baseHook={crudHook}
                />)}
            </div>

        </>
    )
}
export default FormCategory
