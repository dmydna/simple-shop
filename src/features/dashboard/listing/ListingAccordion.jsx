import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function ListingAccordion({ children, eventKey, className, icon = null}) {

    const BASE_URL = "";
    return (
        <>
        <style>{`.ps-6{ padding-left: 58px!important }`}</style>
        <Accordion.Item className="small border-0" eventKey={"0"}>
            <Accordion.Header className="px-1">
                <li className="list-group-item border-0 px-2 py-1">
                    {icon !=null &&  <i className={`bi ${icon} fs-4 ps-0 me-3`}></i> }
                    <span>Listings</span>
                </li>
            </Accordion.Header>
            <Accordion.Body style={{margin:0, padding: 5, width: '100%'}} >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0 bg-tint ps-6">
                        <Link className="text-normalize" to={`/dashboard/listing-list`}>
                            <span>  Listing List </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0 bg-tint ps-6">
                        <Link className="text-normalize" to={`/dashboard/listing-form?mode=create`}>
                            <span> Add Listing </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0 bg-tint ps-6">
                        <Link className="text-normalize" to={`/dashboard/listing-form?mode=edit`}>
                            <div className="item">
                                <span> Edit Listing </span>
                            </div>
                        </Link>
                    </li>
                    <li className="list-group-item border-0 bg-tint ps-6">
                        <Link className="text-normalize" to={`/dashboard/listing-form?mode=draft`}>
                            <div className="item">
                                <span> Draft Listing </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Accordion.Body>
        </Accordion.Item>
        </>
        )
}

export default ListingAccordion;
