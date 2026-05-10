import ModalCrud from "@/features/crud/components/ModalCrud";
import FormProduct from "@/features/product/components/FormProduct";
import { useProductCrudContext } from "@/features/product/contexts/ProductCrudContex";
import FormCrud from "../../../crud/components/FormCrud";
import ProductFormConfig from "./ProductFormConfig";

function ProductFormCrud(){

    const { showModal, setShowModal, ...props } = useProductCrudContext()

    return (
        <FormCrud
            type="product"
            useCrudHook={useProductCrudContext}
        >
                <div className="mb-3">
                    <p className="fw-medium">Product</p>
                    <FormProduct />
                </div>
                <ModalCrud
                    show={showModal}
                    onHide={setShowModal}
                >
                    <ProductFormConfig
                        close={() => setShowModal(false)}
                    />
                </ModalCrud>
        </FormCrud>
    )
}

export default ProductFormCrud;