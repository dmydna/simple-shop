import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useListingsForm } from '../../contexts/ListingFormContext.jsx';
import { useProducts } from '../../contexts/ProductContext.jsx';
import Pagination from '../pagination/Pagination.jsx';
import SearchFilter from '../search/SearchFilter.jsx';
import SearchLive from '../search/SearchLive.jsx';

function ProductSelectTable({ children, handleSelect }) {


  const { filtered, products, loading, filterDraft, setFilterDraft, setActiveFilters, setSearch, setResetFilter } = useProducts()

  // Paginador
  const [items, setItems] = useState([]); // Todos los datos
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Ejemplo: 10 por página
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  const { setCurrentItem } = useListingsForm()

  useEffect(() => {
    // Lógica de paginación
    setItemsPerPage(2)
    setItems(filtered)
  }, [filtered, products, loading])





  return (
    <>
      {children}
      <SearchFilter size='sm' order="order-1" className="d-block"
        items={products}
        filterDraft={filterDraft}
        onFilterDraft={setFilterDraft}
        onActiveFilters={setActiveFilters}
        onResetFilter={setResetFilter}
      >
        <SearchLive
          items={products}
          handleSearch={setSearch}
        />
      </SearchFilter>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ width: '60%' }}>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Mientras carga, mostramos una fila de carga elegante
            <tr>
              <td colSpan="3" className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Cargando datos...</p>
              </td>
            </tr>
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No hay items</td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ width: '60%' }}>{item.name}</td>
                <td>

                  {/* Select */}

                  <input
                    onChange={() => handleSelect(item)}
                    type="radio"
                    name="product_id"
                    id="selecProduct"
                  />

                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default ProductSelectTable;