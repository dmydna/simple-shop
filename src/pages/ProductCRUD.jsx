import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ProductTable from "../features/product/components/ProductTable.jsx";
import FilterBar from "../features/filters/components/FilterBar.jsx";
import SearchLive from "../features/search/SearchLive.jsx";
import {useProducts} from "../features/product/hooks/ProductContext.jsx";
import { useProductsForm } from "../features/product/hooks/ProductFormContext.jsx";
import {useUIContext} from "../contexts/UIContext.jsx";
import {CRUD} from "../utils/crud.js";


const ProductCRUD = () => {

    const navigate = useNavigate();
    const {onHideFilter} = useUIContext();


    const {products, setFilters} = useProducts()

    const {setShowModal, setModalMode, setCurrentItem} = useProductsForm()

    const [isCreating, setIsCreating] = useState(false);
    const [search, setSearch] = useState()

    // Carga inicial

    useEffect(() => {
        if (search) setFilters({page: 0, name: search})
    }, [search])

    useEffect(() => {
        onHideFilter(true);
        if (!isCreating) {
            setIsCreating(true)
        }
    }, []);


    const openCreateModal = () => {
        setModalMode(CRUD.CREATE);
        setCurrentItem({name: "", stock: ""});
        setShowModal(true);
        navigate('/panel/welcome')
    };


    return (
        <>
            <Container className="mt-4">

                <div className="w-100 d-flex flex-wrap mt-2 mb-4">
                    <Link to={'/dashboard'} className={`text-decoration-none text-dark`}>
                        <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted"
                           style={{opacity: '.6', background: ''}}></i>
                        <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3">
                            Dashboard
                        </span>
                    </Link>
                    <span style={{lineHeight: '2.3rem'}} className="text-secondary">
                           Administra tus publicaciones
                    </span>
                </div>



                <FilterBar order="order-1" className="d-block">
                    <Button variant="primary" onClick={openCreateModal} className="mb-5">
                        <i className="bi bi-plus-lg"></i>
                        <span className="ms-2">Crear nuevo item</span>
                    </Button>
                    <SearchLive items={products} handleSearch={setSearch} />
                </FilterBar>
                <ProductTable/>

            </Container>
        </>
    );
};


export default ProductCRUD;
