import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useListings } from '../hooks/ListingContext.jsx';
import { useListingsForm } from '../hooks/ListingFormContext.jsx';
import Pagination from '../../pagination/components/Pagination.jsx';
import { Link } from 'react-router-dom';
import button from "bootstrap/js/src/button.js";


export  const ListingTable = ({children, buttons}) => {

  const { listings, loading, currentPage, setCurrentPage, totalPages } = useListings()
  const { openEditModal, handleDelete, handleVisibility } = useListingsForm()

  useEffect(() => {
    // Lógica de paginación
    setCurrentPage(1)
  }, [])


  return (
    <>
      <div className='shadow-sm border rounded p-3 island'>
        {children('title')}
        <Table className="mb-0" striped={true} bordered={false} hover={true}>
          <thead className='d-none'>
            <tr>
              {/* <th>ID</th> */}
              <th style={{ width: '60%' }}>Nombre</th>
              <th style={{ textAlign: 'end' }} ></th>
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
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No hay items</td>
              </tr>
            ) : (
              listings.map((item) => (
                <tr style={{ borderStyle: 'hidden' }} key={item.id}>
                  {/* <td><span className='text-secondary'>id: </span>{item.id}</td> */}
                  <td style={{ width: '60%' }}>
                    <Link 
                      to={`/productos/${item.hash}/${item.title}`} 
                      className='mb-2 fw-semibold text-decoration-none hover-link' 
                      style={{ fontSize: "1.20rem", color: "#000" }} 
                    >
                      {item.title}
                    </Link>
                    <p className='text-muted small p-0 m-0'>id: {item.id}</p>
                  </td>
                  <td style={{ textAlign: 'end' }} >
                    {children('buttons', item)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
      />
    </>
  );
}

export default ListingTable;
