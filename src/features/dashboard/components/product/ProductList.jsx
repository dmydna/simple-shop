import { useProduct } from "@/features/product/hooks/useProduct";
import SearchLive from "@/features/search/SearchLive";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCrud from "../../../crud/components/ModalCrud";
import ProductActions from "./ProductActions";
import ProductTable from "./ProductTable.jsx";


export const ProductList = ({ }) => {

    const baseHook = useProduct()
    const [search, setSearch] = useState()
    const navigate = useNavigate()
    const [showCrudActions, setShowCrudActions] = useState()


    useEffect(() => {
        if (search) setFilters({ page: 0, name: search })
    }, [search])

    const { setFilters, products } = baseHook;

    const handleOpenEdit = (item) => {
        setShowCrudActions(true)
    }


    return (
        <>
            <div className="mb-3 mx-0 mx-md-2">

                <div className="mx-auto p-4 rounded island border">


                    <ProductTable
                        className=''
                        baseHook={baseHook}
                    >
                        {(key, item) => {
                            if (key === 'title') {
                                return (
                                    <>
                                        <div>
                                            <p className="h5 mb-3">
                                                Productos
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between my-4 flex-wrap" >
                                            <Button
                                                variant="light"
                                                onClick={() => navigate('/dashboard/product-crud?edit=false')}
                                                className="my-2 flex-fill flex-md-grow-0">
                                                <i className="bi bi-plus-lg"></i>
                                                <span className="fw-medium ms-2">Create new</span>
                                            </Button>
                                            <SearchLive
                                                className='flex-fill flex-md-grow-0'
                                                items={products}
                                                handleSearch={setSearch}
                                            />
                                        </div>
                                    </>


                                )
                            }
                            if (key === 'buttons') {
                                return (
                                    <>  {/** Editar */}
                                        <Button
                                            variant="border-0 ligth"
                                            size="sm"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            <i className="bi bi-three-dots h5"></i>
                                        </Button>

                                    </>
                                )
                            }

                        }}
                    </ProductTable>
                </div>
            </div>


            <ModalCrud
                show={showCrudActions}
                onHide={setShowCrudActions}
            >
                <ProductActions
                    close={() => setShowCrudActions(false)}
                />
            </ModalCrud>

        </>

    );
}

export default ProductList;