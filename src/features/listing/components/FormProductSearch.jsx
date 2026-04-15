import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from '../../pagination/components/Pagination.jsx';
import { useProduct } from "../../product/hooks/useProduct.js";
import SearchLive from '../../search/SearchLive.jsx';
import { useListingCrudContext } from "../contexts/ListingCrudContext.jsx";


function FormProductSearch({ className, children, onSelect }) {

    const { error, products, currentPage,setCurrentPage, totalPages,
        setFilters, filters ,totalElements, loading,
        setCurrentFilter, fetchData, content } = useProduct()

    const {setIsSelectedProduct, setDataItem, dataItem} = useListingCrudContext()

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState()

    const [selectedItem, setSelectedItem] = useState({})

    const selected = (item) => {

        // selecciona el item vacio para crear producto desde cero.
        if(Object.keys(selectedItem).length === 0 &&
            Object.keys(item).length === 0
        ){return 'selected'}
        // selecciona item no vacio.
        return (item.id === selectedItem?.id ? 'selected' : '')
    }

    // Carga inicial

    useEffect(()=>{
        if(search) {
            setShow(true)
            setFilters({size:4, name: search})
        }
    }, [search])


    const handleActive = () => {
        setShow(false)
    }

    useEffect(()=>{
        console.log('Products desde Search', products)
    },[products])

    useEffect(()=>{
        console.log('SELECTED ITEM :::>',selectedItem)
    },[selectedItem])


    const handleClick = (item) => {
        setSelectedItem(item)
        setIsSelectedProduct(true)
        const safeItem = {
            "productId":item?.id,
            "productName": item?.name,
            "brand": item?.brand,
            "sku": item?.sku,
            "stock": item?.stock,
            "weight": item?.weight,
            "category": item?.category
        }
        setDataItem({...dataItem, ...safeItem})
    }



  return (

        <div className={className}>
            {children}
            <SearchLive
                items={products}
                handleSearch={setSearch}
                handleActive={handleActive}
            />
            <Table bordered hover>
                <thead className='d-none'>
                <tr>
                    <th className='d-none'>ID</th>
                    <th style={{ width: '60%' }}>Nombre</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                {/* oculta cuando no hay resultado */}
                { show && (
                    <tbody>
                    {loading ? (
                        // Mientras carga, mostramos una fila de carga
                        <tr>
                            <td colSpan="3" className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                                <p className="mt-2">Cargando datos...</p>
                            </td>
                        </tr>
                    ) : products.length == 0 ? (
                        <>
                            <tr>
                                <td colSpan="3" className="text-center">
                                    <p>No se encontraron items.</p>
                                </td>
                            </tr>
                            <tr onClick={()=>handleClick({})}
                                className={`${selected({})} text-center`}>
                                {/** ENVIA item vacio para crear nuevo */}
                                <td colSpan="3">
                                    <p className={``}> <b>Crear nuevo</b>  </p>
                                </td>
                            </tr>

                        </>

                    ) : (
                        products.map((item) => (
                            <tr onClick={()=>handleClick(item)}
                                className={`${selected(item)}`}
                                key={item.id} >
                                <td className='d-none'>{item.id}</td>
                                <td style={{ width: '60%' }}>{item.name}</td>
                                <td className='d-none'></td>
                            </tr>
                        ))
                    )}
                    </tbody>
                )}
            </Table>

            {show  &&  products.length === 0 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            )}

        </div>
  );
}

export default FormProductSearch;