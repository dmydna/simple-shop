import Accordion from 'react-bootstrap/Accordion';
import DangerList from "./DangerList.jsx";

//@deprecated
function AccordionDanger({children, eventKey, className}) {
    return (
        <Accordion.Item className={className} eventKey={eventKey || "0"}>
            <Accordion.Header>{children}</Accordion.Header>
            <Accordion.Body>
                <DangerList></DangerList>
            </Accordion.Body>
        </Accordion.Item>)
}

export default AccordionDanger;