
import ListingAccordion from "@/features/dashboard/layout/ListingAccordion";
import ProductAccordion from "@/features/dashboard/layout/ProductAccordion";
import UserAccordion from "@/features/dashboard/layout/UserAccordion";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function SideBarDashboard({ defaultKey = '', showHearder }) {
    const [activeKey, setActiveKey] = useState(defaultKey);

    useEffect(() => {
        setActiveKey(defaultKey);
    }, []);

    const navigate = useNavigate()

    return (
        <>
            {showHearder && (
                <div onClick={() => navigate('/dashboard')} className="btn p-1 py-2 mb-0 w-100  d-flex justify-content-between">
                    {/* <i className="bi bi-terminal me-2"></i> */}
                    <p>
                        <span className="fw-medium">Dashboard</span>
                        <i className="d-none bi bi-chevron-right"></i>
                    </p>

                </div>
            )}


            <Accordion
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
            >
                <ListingAccordion eventKey={activeKey} />
                <ProductAccordion eventKey={activeKey} />
                <UserAccordion eventKey={activeKey} />
            </Accordion>

            <ul className="list-group list-group-flush">

                <li className="list-group-item border-0">
                    <Link className="simple-link" to={`/dashboard/dev`}>
                        <i className="bi bi-code-square fs-4 ps-0 p-2 me-1"></i>
                        <span> Dev's options </span>
                        <i className="d-none bi bi-chevron-right"></i>
                    </Link>
                </li>

                <li className="list-group-item border-0">
                    <Link className="simple-link" to={`/user/profile`}>
                        <i className="bi bi-gear fs-4 ps-0 p-2 me-2"></i>
                        <span> Configuration </span>
                        <i className="d-none bi bi-chevron-right"></i>
                    </Link>
                </li>

            </ul>



        </>

    )
}

export default SideBarDashboard;
