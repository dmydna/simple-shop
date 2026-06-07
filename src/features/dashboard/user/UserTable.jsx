import { pillColor } from '@utils/enums';
import Pagination from '@/features/pagination/components/Pagination.jsx';
import { useCustomParams } from '@/hooks/useCustomParams';
import { useNavParams } from '@/hooks/useNavParams';
import DataView from '@common/DataView';
import { placeholderURL } from "@utils/image";
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';

// TODO: resolver filtro crud de usuarios 
export const UserTable = ({  baseHook, className }) => {

    const { content, loading,  totalPages, ...props } = baseHook

    const { setSearchParams } = useCustomParams()
    const { idParam } = useNavParams({ baseHook: baseHook })

    const toggleSelect = (item) => {
        setSearchParams(prev => ({...prev, 
            id: idParam != item?.id ? item?.id : null  
        }))
    }

    const openDialogActions = (item)=>{
        setSearchParams(prev => ({ ...prev, dialog: 'action', id: item?.id  })) 
    }


    return (
        <DataView 
            loading={loading}
            data={content}
            emptyIcon={"bi bi-person"}
            emptyMessage={"No hay items"}
        >
        <>
            <div className={`${className} small w-100`}>
                

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>

                            <tr className='border-bottom'>
                                {/* Selection */}
                                <th style={{ width: '50px' }} className='d-none  d-md-table-cell text-secondary'></th>
                                {/* Item */}
                                <th style={{ width: '250px' }}  className='text-secondary'>Username</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Role</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Email</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Status</th>
                                {/* Action */}
                                <th style={{ width: '50px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
                            </tr>

                    </thead>
                    <tbody>
                        { content?.map((item) => (


                                <tr className={`onhover ${item?.id === idParam ? 'selected' : ''}`}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>

                                    {/* Selection */}


                                    <td
                                        onClick={() => toggleSelect(item)}
                                        className='text-secondary d-none  d-md-table-cell'>
                                        <Form.Check // prettier-ignore
                                            type='checkbox'
                                            id={`default-radio`}
                                            className='mt-3'
                                           checked={idParam == item.id}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(item);
                                            }}
                                        />
                                    </td>

                                    {/* Item */}

                                    {item?.username && (
                                        <td>

                                            <img
                                                style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                                className="border border-1 rounded flex-shrink-0"
                                                src={item?.image || placeholderURL.user(item?.id) }
                                            />

                                            <span className='mx-3 fw-medium'>{item?.username}</span>
                                        </td>
                                    )}



                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase fw-medium ${pillColor[item?.role]}`}>
                                            {item?.role || '-.-'}
                                        </span>
                                    </td>

                                    <td className='fw-medium' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-email'></i>
                                        {item?.email}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }} >
                                        <span 
                                           className={`text-lowercase ${pillColor[item?.meta?.status]}`} >
                                            {item?.meta?.status || '-.-'}
                                        </span>
                                    </td>

                                        {/**Action */}
                                        <td className='small d-table-cell d-md-none'
                                            style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                            <Button
                                                variant="border-0 ligth"
                                                size="sm"
                                                onClick={ () => openDialogActions(item) }
                                            >
                                                <i className="bi bi-three-dots h5"></i>
                                            </Button>

                                        </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>


            </div>

            <Pagination
                className="mb-0"
                totalPages={totalPages}
            />

        </>
     </DataView>   
    );
}


export default React.memo(UserTable);

