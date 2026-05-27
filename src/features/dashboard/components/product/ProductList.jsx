import { useProduct } from "@/features/product/hooks/useProduct";
import SearchLive from "@/features/search/SearchLive";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCrud from "../../../crud/components/ModalCrud";
import ProductActions from "./ProductActions";
import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable.jsx";


export const ProductList = ({ }) => {

    const navigate = useNavigate()
    const baseHook = useProduct()
    const { setFilters, products } = baseHook;
    const [search, setSearch] = useState()

    // URLs
    const FORM_URL = "/dashboard/product-form";
    const CURRENT_URL = "/dashboard/product-list";

    useEffect(() => {
        if (search) setFilters({ page: 0, name: search })
    }, [search])


    return (
        <>
        <div className="mb-3 mx-0 mx-md-2">

            <div className="mx-auto p-4 rounded island border">
                <div>
                    <div>
                        <p className="h5 mb-3">
                            Productos
                        </p>
                    </div>
                    <div className="d-flex justify-content-between my-4 flex-wrap" >
                        <Button
                            variant="light"
                            onClick={() => navigate(`${FORM_URL}?mode=create`)}
                            className="my-2 flex-fill flex-md-grow-0">
                            <i className="bi bi-plus-lg"></i>
                            <span className="fw-medium ms-2">Create new</span>
                        </Button>
                        <SearchLive
                            className='flex-fill flex-md-grow-0'
                            items={products}
                            handleSearch={setSearch}
                            handleFilter={() => navigate(`${CURRENT_URL}?dialog=filter`)}
                        />
                    </div>
                </div>

                <ProductTable baseHook={baseHook} />

            </div>
        </div>

        </>

    );
}

export default ProductList;
