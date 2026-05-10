import { Link, useNavigate } from "react-router-dom";


export default function SideBarDashboardSlim({ onShow, expandable = true }) {

    const BASE_URL ='/dashboard'
    const navigate = useNavigate();

    return (
        <ul className="list-group list-group-flush">

            {expandable && (
                <i onClick={() => onShow(true)} className="pointer bi bi-list mx-3 fs-4 mb-3"></i>
            )}
            
            {!expandable && (
                <i onClick={() => navigate(BASE_URL)} className="pointer bi bi-list mx-3 fs-4 mb-3"></i>
            )}

            {/* <li className="list-group-item border-0">
                <Link className="text-center simple-link d-flex flex-column" to={`${BASE_URL}`}>
                    <i className="bi bi-sliders fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > Admin </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li> */}

            <li className="list-group-item border-0">
                <Link className="text-center simple-link d-flex flex-column" to={`${BASE_URL}/listing-list`}>
                    <i className="bi bi-sticky fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > Listing </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li>

            <li className="list-group-item border-0">
                <Link className="text-center simple-link d-flex flex-column" to={`${BASE_URL}/product-list`}>
                    <i className="bi bi-box-seam fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > Product </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li>


            <li className="list-group-item border-0">
                <Link className="text-center simple-link d-flex flex-column" to={`${BASE_URL}/user-list`}>
                    <i className="bi-file-earmark-person fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > User </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li>

            <li className="list-group-item border-0">
                <Link className="text-center simple-link d-flex flex-column" to={`${BASE_URL}/dev`}>
                    <i className="bi bi-code-square fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > Dev </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li>

            <li className="list-group-item border-0">
                <Link className="text-center  simple-link d-flex flex-column" to={`/user/profile`}>
                    <i className="bi bi-gear fs-4"></i>
                    <span style={{ fontSize: '9pt' }} > Config </span>
                    <i className="d-none bi bi-chevron-right"></i>
                </Link>
            </li>

        </ul>

    )
}
