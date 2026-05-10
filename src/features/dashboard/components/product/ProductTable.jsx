import CopyButton from '@/components/common/CopyButton';
import { color, ImgGenApi } from '@/dev/utils';
import { formatDate, statusColor } from '@/features/dashboard/util.js';
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect } from 'react';
import { Card, Form, Table } from 'react-bootstrap';
export default function ProductTable({ children, currentItem, baseHook, handleclick, className }){

    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters } = baseHook
  
    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    const selected =   (item) => {
        return (item.id === currentItem?.id ? 'selected' : '')
    }


    const baseImg = (index) => ({
        "icon": "F7D3",
        "dimension": "150x150",
        "fontSize": "60",
        "fontWeight": "light",
        "textColor": "fff",
        "background": Object.values(color)[index % Object.values(color).length],
    })


    const status_cases = ["ACTIVE", "INACTIVE", "DRAFT"]

    return (
        <>
            <div className={`${className} small w-100`}>
                {children('title')}

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>
                        {content?.length !== 0 && (
                            <tr className='border-bottom'>
                                {/**Selection */}
                                 <th style={{ width: '150px' }} className='d-none  d-md-table-cell text-secondary'></th>
                                {/**Item */}
                                <th className='text-secondary'>Name</th>
                                <th style={{width: '200px'}} className='text-secondary'>Sku</th>
                                <th style={{width: '150px'}} className='text-secondary'>Created at</th>
                                <th style={{width: '150px'}} className='text-secondary'>Brand</th>
                                <th style={{width: '150px'}} className='text-secondary'>Status</th>
                                {/** Action */}
                                <th style={{width: '150px'}} 
                                className='d-block d-table-cell d-md-none text-secondarytext-secondary'></th>
                            </tr>
                        )}
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
                        ) : content?.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">No hay items</td>
                            </tr>
                        ) : (
                            content?.map((item) => (

                                <tr className={`onhover ${selected(item)}`}
                                    // onClick={() => handleclick(item)}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>
                                    {/* Selection */}
  

                                    <td 
                                        onClick={() => handleclick(item)}
                                        className='text-secondary d-none  d-md-table-cell'>
                                            <Form.Check // prettier-ignore
                                                type='checkbox'
                                                id={`default-radio`}
                                                className='mt-3'
                                                checked={currentItem?.id === item.id}
                                                onChange={(e) => {
                                                   e.stopPropagation();
                                                    handleclick(item);  
                                                }}
                                            />
                                    </td>


                                    {/** Item */}
                                    <td>
                                        <Card.Img
                                            style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                            className="border border-1 rounded flex-shrink-0"
                                            src={ImgGenApi({ ...baseImg(item.id) })}
                                        />
                                        <span className='mx-3 fw-medium'>{item?.name || ''}</span>
                                    </td>

                                    {/* Sku */}
                                    <td className='text-secondary'>
                                        <div style={{ lineHeight: '4.2' }} className='btn btn-sm p-0'>
                                            <CopyButton value={item?.sku} />
                                        </div>
                                    </td>

                                    {/* Created At */}
                                    <td className='text-secondary' style={{ lineHeight: '4.2'}}  >
                                        <i className='bi bi-calendar me-2'></i>
                                        {item?.meta.createdAt ? formatDate(item?.meta.createdAt || []) : 'n/a'}
                                    </td>

                                    {/* Brand */}
                                    <td className='text-secondary' style={{ lineHeight: '4.2' }}  >
                                        {item?.brand || '-.-'}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase ${statusColor(status_cases, item?.status)}`}>
                                            {item?.status}
                                        </span>
                                    </td>

                                   {/**Action */}
                                    <td className='small'
                                        style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                        {children('buttons', item)}
                                    </td>



                                </tr>

                            ))
                        )}
                    </tbody>
                </Table>


            </div>

            <Pagination
                className="mb-0"
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />

        </>
    );
}

