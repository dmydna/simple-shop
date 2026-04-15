import { useEffect, useState } from "react";
import { Accordion } from 'react-bootstrap';

function CrudAccordion({children ,defaultKey="0", currentItem}) {

    const [activeKey, setActiveKey] = useState(defaultKey);

    useEffect(() => {
        setActiveKey(defaultKey);
    }, [currentItem]);

    return (
        <Accordion
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
        >
            {children}
        </Accordion>
    );
}


export default CrudAccordion;