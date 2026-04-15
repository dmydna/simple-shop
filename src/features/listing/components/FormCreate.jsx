import InputCrudFloating from "@/features/crud/components/InputCrudFloating.jsx";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";


function FormCreate({ children, className }) {

    const { formData, handleChange, modalMode,
        isDisabledField, editableFields, handleEnableEdit } = useListingCrudContext()

    return (
        <>


            <div className="mb-3">
                <FloatingLabel label="Selecciona una opción">
                <Form.Select value="">
                    <option value="">-- Selecciona --</option>
                    <option value="1" >Crear publicacion nueva desde cero</option>
                    <option value="2" >Crear publicacion a partir de existente</option>
                </Form.Select>
                </FloatingLabel>

            </div>

            <div className="mb-3">
                <p className="h6 my-2">Introduce el hash del Post</p>
                <p className="small text-secondary my-2">
                    debes introducir el hash del Post a clonar.
                </p>
                <InputCrudFloating
                    name={"description"}
                    label={"Hash"}
                    useHookCrud={useListingCrudContext}
                />
            </div>


            <div className="mb-3">
                <p className="h6 my-2">Introduce Sku del producto:</p>
                <p className="small text-secondary my-2">si no existe se creara un nuevo producto.</p>
                <InputCrudFloating
                    name={"description"}
                    label={"Sku"}
                    useHookCrud={useListingCrudContext}
                />
            </div>
            
            <Button className="d-block mx-auto" > Enviar </Button>


        </>
    )
}
export default FormCreate;
