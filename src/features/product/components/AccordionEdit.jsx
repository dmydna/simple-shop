import Accordion from 'react-bootstrap/Accordion';
import EditList from "./EditList.jsx";

//@deprecated
function AccordionEdit({children,className, eventKey}) {
    return (
        <Accordion.Item className={className} eventKey={eventKey || "0"}>
            <Accordion.Header>{children}</Accordion.Header>
            <Accordion.Body>
                <EditList></EditList>
            </Accordion.Body>
        </Accordion.Item>)
}

export default AccordionEdit;