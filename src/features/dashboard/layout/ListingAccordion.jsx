import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListingAccordion({ children, eventKey, className }) {

    const BASE_URL = "";
    return (
        <Accordion.Item className="small border-0" eventKey={"0"}>
            <Accordion.Header className="px-1">
                <li className="list-group-item border-0 px-2 py-1">
                    <i className="bi bi-sticky fs-4 ps-0 me-3"></i>
                    <span>Listings</span>
                </li>
            </Accordion.Header>
            <Accordion.Body style={{marginLeft: '20px'}} >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/listing-list`}>
                            <span>  Listing List </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/listing-form?mode=create`}>
                            <span> Add Listing </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/listing-form?mode=edit`}>
                            <div className="item">
                                <span> Edit Listing </span>
                            </div>
                        </Link>
                    </li>
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/listing-form?mode=draft`}>
                            <div className="item">
                                <span> Draft Listing </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Accordion.Body>
        </Accordion.Item>)
}

export default ListingAccordion;
