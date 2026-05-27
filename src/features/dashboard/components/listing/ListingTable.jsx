import CopyButton from '@/components/common/CopyButton';
import { formatDate, pillColor } from '@/features/dashboard/util.js';
import Pagination from '@/features/pagination/components/Pagination.jsx';
import { useCustomParams } from '@/hooks/useCustomParams';
import { useNavParams } from '@/hooks/useNavParams';
import DataView from '@common/DataView';
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { placeholderURL } from '@utils/image'


export const ListingTable = ({ baseHook, className, }) => {


    // eslint-disable-next-line no-unused-vars
    const { content, loading, totalPages, ...props } = baseHook;

    const { setSearchParams } = useCustomParams()

    const { hashParam } = useNavParams({ baseHook: baseHook })

    const toggleSelect = (item) => {
        setSearchParams(prev => ({
            ...prev, hash:
                hashParam != item?.hash ? item?.hash : null
        }))
    }

    const openDialogActions = (item) => {
        setSearchParams(prev => ({ ...prev, dialog: 'action', hash: item?.hash }))
    }



    return (
        <DataView
            loading={loading}
            data={content}
            emptyIcon={"bi bi-smail"}
            emptyMessage={"No hay items"}
        >
            <>
                <div className={`${className} small w-100`}>

                    <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                        <thead className=''>
                            <tr className='border-bottom'>
                                <th style={{ width: '150px' }} className='d-none  d-md-table-cell text-secondary'></th>
                                <th style={{ width: '150px' }} className='text-secondary'>Title</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Hash</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Created at</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Status</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Price</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Availability</th>
                                <th style={{ width: '150px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.map((item) => (

                                <tr className={`onhover ${item.hash === hashParam ? 'selected' : ''}`}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>

                                    <td
                                        onClick={() => toggleSelect(item)}
                                        className='text-secondary d-none  d-md-table-cell'>
                                        <Form.Check // prettier-ignore
                                            type='checkbox'
                                            id={`default-radio`}
                                            className='mt-3'
                                            checked={hashParam === item.hash}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(item);
                                            }}
                                        />
                                    </td>

                                    <td>

                                        <img
                                            style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                            className="bg-white border border-1 rounded flex-shrink-0"
                                            src={item?.thumbnail || placeholderURL.listing(item?.id)}
                                        />

                                        <span className='mx-3 fw-medium'>{item?.title}</span>
                                    </td>

                                    <td className='text-secondary'>
                                        <div style={{ lineHeight: '4.2' }} className='btn btn-sm p-0'>
                                            <CopyButton value={item?.hash} />
                                        </div>
                                    </td>


                                    <td className='text-secondary' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-calendar me-2'></i>
                                        {item?.meta?.createdAt ? formatDate(item?.meta?.createdAt) : '-.-'}
                                    </td>

                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase ${pillColor[item?.meta?.status]}`}>
                                            {item?.meta?.status}
                                        </span>
                                    </td>

                                    <td className='fw-medium' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-currency-dollar'></i>
                                        {item?.price || 0}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }} >
                                        <span
                                            className={`${pillColor[item?.availabilityStatus]}`}>
                                            {item?.availabilityStatus}
                                        </span>
                                    </td>


                                    {/**Action */}


                                    <td className='small d-table-cell d-md-none'
                                        style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                        <Button
                                            size="sm"
                                            variant="border-0 ligth"
                                            onClick={() => openDialogActions(item)}
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


export default React.memo(ListingTable);
