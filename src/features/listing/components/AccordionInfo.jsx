import Accordion from 'react-bootstrap/Accordion';
import AccordionEdit from "./AccordionEdit.jsx";
import {useListingCrud} from "../contexts/ListingCrudContext.jsx";

function AccordionInfo({children, eventKey, className}) {
    const {currentListing} = useListingCrud();

    return (
    <Accordion.Item className={className} eventKey={eventKey || "0"}>
        <Accordion.Header>{children}</Accordion.Header>
        <Accordion.Body>
            <p className='h4'>{currentListing.title}</p>

            <p style={{ opacity: '.5' }} className="mt-3 bg-white">
                {currentListing.description}
            </p>
        </Accordion.Body>
    </Accordion.Item>)
}

export default AccordionInfo;