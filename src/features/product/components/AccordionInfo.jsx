import Accordion from 'react-bootstrap/Accordion';
import {useProductCrud} from "../contexts/ProductCrudContex.jsx";
import StepBadge from '../../wizardCrud/components/StepBadge.jsx';

function AccordionInfo({children, eventKey, className}) {
    const {currentItem} = useProductCrud();

    return (
    <Accordion.Item className={className} eventKey={eventKey || "0"}>
        <Accordion.Header>{children}</Accordion.Header>
        <Accordion.Body>
                <div>
                    <p className='h4 mb-4'>{currentItem.name} </p>

                </div>
                <div
                    style={{ backgroundColor: '' }} className="position-relative border island shadow-none p-3 border-left"
                >
                    <StepBadge 
                       position="bottom"
                       ico='bi-three-dots bi'
                       className='position-absolute p-2 rounded'
                       style={{ 
                          top: '10px', 
                          right: '10px', 
                          opacity: '0.8', 
                          fontSize: '1rem', 
                          lineHeight: '2px', 
                          backgroundColor: 'rgba(238, 238, 238, 0.933)' 
                        }}
                    >
                       <ul className="list-unstyled mb-0 d-flex flex-column p-0">
                           <li  
                           onClick={{}}
                           className="w-100 btn border mb-2">
                                <i className="bi bi-pencil pointer me-2"></i>
                                <small>Editar</small>
                            </li>
                           <li className="w-100 btn border">
                                <i className="bi bi-trash pointer me-2"></i>
                                <small>Eliminar</small>
                            </li>
                       </ul>
                    </StepBadge>


                    <small className="d-block text-body-secondary">
                        <b className="me-2">Id :</b> {currentItem?.id}
                    </small>

                    {currentItem?.stock && (
                        <small className="d-block text-body-secondary">
                            <b className="me-2">Stock :</b> {currentItem?.stock}
                        </small>
                    )}

                    {currentItem.category && (
                        <small className="d-block text-body-secondary">
                            <b className="me-2">Category :</b> {currentItem?.category}
                        </small>
                    )}
                    {currentItem?.brand && (
                        <small className="d-block text-body-secondary">
                            <b className="me-2">Brand :</b>{currentItem?.brand}
                        </small>
                    )}

                    {currentItem?.tags && currentItem?.tags.length != 0 && (
                        <ul className='d-flex flex-wrap gap-3 list-unstyled mb-0 mt-3'>
                            <small className='fw-bold text-body-secondary mt-2'>Tags:</small>
                            {currentItem?.tags?.map((tag, index) => (
                                <li key={index} className='text-body-secondary border p-1 px-2 rounded-3'>
                                    <small>{tag}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
        </Accordion.Body>
    </Accordion.Item>)
}

export default AccordionInfo;
