import { Link, useNavigate } from "react-router-dom";
import SiderbarLink from "@f/sidebar/components/SidebarLink";

export default function SidebarDashboard() {

    const BASE_URL ='/dashboard'


    return (
        <ul className="list-group list-group-flush">

            <SiderbarLink
                className='mb-4'
                to={BASE_URL}
                icon="bi-list-nested"
                label="panel"
            />


            <SiderbarLink
                className="mb-4"
                to={`${BASE_URL}/listing-list`}
                icon="bi-sticky"
                label="listings"
            />

            <SiderbarLink
                className="mb-4"
                to={`${BASE_URL}/product-list`}
                icon="bi-box-seam"
                label="products"
            />

            <SiderbarLink
                 className="mb-4"
                to={`${BASE_URL}/user-list`}
                icon="bi-person"
                label="users"
            />


            <SiderbarLink
                className="mb-3"
                to={`${BASE_URL}/dev`}
                icon="bi-terminal"
                label="demo"
            />


        </ul>

    )
}
