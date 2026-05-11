import ModalCrud from "@/features/crud/components/ModalCrud";
import FormCategory from "@/features/product/components/FormCategory";
import FormDimentions from "@/features/product/components/FormDimentions";
import FormProduct from "@/features/product/components/FormProduct";
import FormTags from "@/features/product/components/FormTags";
import { useProductCrud } from "@/features/product/hooks/useProductCrud";
import FormCrud from "../../../crud/components/FormCrud";
import ProductActions from "./ProductActions";

function ProductForm(){

    const crudHook = useProductCrud()
    const { showModal, setShowModal } = crudHook

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
                <ModalCrud
                    show={showModal}
                    onHide={setShowModal}
                >
                    <ProductActions
                        close={() => setShowModal(false)}
                    />
                </ModalCrud>
        </FormCrud>
    )
}

export default ProductForm;