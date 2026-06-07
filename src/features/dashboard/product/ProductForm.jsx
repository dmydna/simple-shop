import FormCategory from "@/features/product/components/FormCategory";
import FormDimentions from "@/features/product/components/FormDimentions";
import FormProduct from "@/features/product/components/FormProduct";
import FormTags from "@/features/product/components/FormTags";
import { useProductCrud } from "@/features/product/hooks/useProductCrud";
import FormCrud from "@features/crud/components/FormCrud";

function ProductForm(){

    const crudHook = useProductCrud()


    return (
        <FormCrud
            type="product"
            crudHook={crudHook}
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

export default ProductForm;