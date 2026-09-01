import FormCrud from "@/features/crud/components/FormCrud";
import FormProduct from "@f/product/components/ProductForm/FormProduct";
import FormDimentions from "@f/product/components/ProductForm/FormDimentions";
import FormCategory from "@f/product/components/ProductForm/FormCategory";
import FormTags from "@f/product/components/ProductForm/FormTags";
import { useProductForm } from "@f/product/hooks/useProductForm";


export default function ProductFormPage(){

    const crudHook = useProductForm()


    return (
        <FormCrud
            {...crudHook}
            enableEdit
            enableCreate
        >
                <div className="mb-3">
                    <p className="fw-medium">Product</p>
                    
                    <FormProduct crudHook={crudHook} />

                    <FormDimentions crudHook={crudHook} />

                    <FormCategory crudHook={crudHook}  />

                    <FormTags crudHook={crudHook}/>
                </div>

        </FormCrud>
    )
}
