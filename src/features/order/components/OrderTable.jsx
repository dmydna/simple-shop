import { Table } from 'react-bootstrap';
import MyOrderRating from './MyOrderRating';



export default function OrderTable({ className, content }) {

    return (
        <>
            <div className={`${className} small w-100`}>

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>
                        <tr style={{height:'0px', visibility:'collapse'}}>

                            <th style={{ width: '50px' }} className='text-secondary'>IMAGE</th>
                            <th style={{ width: '250px' }} className='text-secondary'>TITLE</th>
                            <th style={{ width: '150px' }} className='text-secondary'>RATING</th>
                            <th style={{ width: '150px' }} className='text-secondary'>DESCRIPTION</th>
                            <th style={{ width: '150px' }} className='d-block d-table-cell d-md-none text-secondary'>PRICE</th>

                        </tr>
                    </thead>
                    <tbody>
                        {content?.map((item) => (

                            <tr className={`onhover`}
                                style={{ overflow: "visible", height: "70px" }} key={item.id}>
                                
                                {/* IMAGE */}
                                <td>
                                    <img
                                        style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                        className="bg-white border border-1 rounded flex-shrink-0"
                                        src={item?.thumbnail}
                                    />
                                </td>

                                {/* TTILE */}
                                <td style={{ lineHeight: '4.2', textAlign: 'start' }}>
                                    <span className='fw-medium'>{item?.name}</span>
                                </td>

                                {/* RATING */}
                                <td className='text-secondary'>
                                    <div style={{ lineHeight: '4.2' }}>
                                            <MyOrderRating  {...item}/>
                                    </div>
                                </td>

                                {/* DESCRIPTION */}
                                <td className='text-secondary' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                    {item?.quantity} x $ {(item?.priceAtPurchase || 0).toFixed(2)} 
                                    {item?.discountPercentageAtPurchase && ` (${item.discountPercentageAtPurchase}%OFF)`}
                                </td>

                                {/* PRICE */}
                                <td className='fw-medium d-table-cell'
                                    style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                    <i className='bi bi-currency-dollar'></i>
                                    {(item?.priceAtPurchase*item?.quantity || 0).toFixed(2)}
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>


            </div>


        </>
    );
}

