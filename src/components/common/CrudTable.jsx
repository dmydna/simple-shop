import React, {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import Pagination from '../../features/pagination/components/Pagination.jsx';
import { Link } from 'react-router-dom';

export  const CrudTable = ({children, crudHook, baseHook,  handleclick, className}) => {

    const { content, loading ,currentPage, setCurrentPage, totalPages } = baseHook
    const { currentItem } = crudHook

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(1)
    }, [])

    const selected = (item) => {
        return (item.id === currentItem?.id ? 'selected' : '')
    }

    return (
        <>
            <div className={`${className}`}>
                {children('title')}
                <Table className="mb-0" striped={false} bordered={false} hover={true}>
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
                    ) : content.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">No hay items</td>
                        </tr>
                    ) : (
                        content.map((item) => (
                            <tr className={`onhover ${selected(item)}`}
                                onClick={() =>handleclick(item)}
                                style={{ borderStyle: 'hidden' }} key={item.id}>
                                <td style={{ width: '60%' }}>
                                    <Link
                                        to={`/productos/${item.hash}/${item.title}`}
                                        className='mb-2 fw-semibold text-decoration-none hover-link'
                                        style={{ fontSize: "1.20rem", color: "#000" }}
                                    >
                                        {item?.name || item?.title}
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

export default CrudTable;
