import { color, ImgGenApi } from '@/dev/utils';
import { statusColor } from '@/features/dashboard/util.js';
import Pagination from '@/features/pagination/components/Pagination.jsx';
import { useNavParams } from '@/hooks/useNavParams';
import { useEffect } from 'react';
import { Card, Form, Table } from 'react-bootstrap';


// TODO resolver filtro crud de usuarios 
export const UserTable = ({ children, baseHook, className }) => {

    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters } = baseHook

    const { searchParams, setSearchParams, idParam } = useNavParams({ baseHook: baseHook })


    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(1)
    }, [])


    const handleSelect = (item) => {

        // Selecciona
        setSearchParams(prev => {
            const nuevosParams = new URLSearchParams(prev);
            nuevosParams.set('id', item.id);
            return nuevosParams;
        });

        // Deselecciona
        if (idParam == item.id) {
            setSearchParams(prev => {
                const nuevosParams = new URLSearchParams(prev);
                nuevosParams.delete('id');
                return nuevosParams;
            });
        }
    }

    const selected =   (item) => {
        return (item.id == idParam ? 'selected' : '')
    }


    const baseImg = (index) => ({
        "icon": "bi-person",
        "dimension": "150x150",
        "fontSize": "60",
        "fontWeight": "light",
        "textColor": "fff",
        "background": Object.values(color)[index % Object.values(color).length],
    })


    const role_cases = ["ADMIN", "CLIENT", ""]

    return (
        <>
            <div className={`${className} small w-100`}>
                {children('title')}

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>
                        {content?.length !== 0 && (
                            <tr className='border-bottom'>
                                {/* Selection */}
                                <th style={{ width: '150px' }} className='d-none  d-md-table-cell text-secondary'></th>
                                {/* Item */}
                                <th className='text-secondary'>Username</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Role</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Email</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Status</th>
                                {/* Action */}
                                <th style={{ width: '200px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
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


                                <tr className={`onhover`}
                                    onClick={() => handleSelect(item)}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>

                                    {/* Selection */}


                                    <td
                                        onClick={() => handleSelect(item)}
                                        className='text-secondary d-none  d-md-table-cell'>
                                        <Form.Check // prettier-ignore
                                            type='checkbox'
                                            id={`default-radio`}
                                            className='mt-3'
                                           checked={idParam == item.id}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleSelect(item);
                                            }}
                                        />
                                    </td>

                                    {/* Item */}

                                    {item?.username && (
                                        <td>

                                            <Card.Img
                                                style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                                className="border border-1 rounded flex-shrink-0"
                                                src={item?.image || ImgGenApi({ ...baseImg(item.id) })}
                                            />


                                            <span className='mx-3 fw-medium'>{item?.username}</span>
                                        </td>
                                    )}



                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase fw-medium ${statusColor(role_cases, item?.role)}`}>
                                            {item?.role || '-.-'}
                                        </span>
                                    </td>

                                    <td className='fw-medium' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-email'></i>
                                        {item?.email}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span>
                                            {item?.meta?.status || '-.-'}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className='small d-table-cell d-md-none'
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
                totalPages={totalPages}
            />

        </>
    );
}

export default UserTable;
