import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductAccordion({ children, eventKey, className }) {

    return (
        <Accordion.Item className="small border-0" eventKey={"1"}>
            <Accordion.Header className="px-1">
                <li className="list-group-item border-0 px-2 py-1">
                    <i className="bi bi-box-seam fs-4 ps-0 me-3"></i>
                    <span>Products</span>
                </li>

            </Accordion.Header>
            <Accordion.Body style={{marginLeft: '20px'}} >
                <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/product-list`}>
                            <span> Product List </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/product-form?mode=create`}>
                            <span> Add Product </span>
                        </Link>
                    </li>
                    <li className="list-group-item border-0">
                        <Link className="simple-link" to={`/dashboard/product-form?mode=edit`}>
                            <div className="item">
                                <span> Edit Product </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </Accordion.Body>
        </Accordion.Item>)
}

export default ProductAccordion;