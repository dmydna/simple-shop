import { Link, useNavigate } from "react-router-dom";
import SiderbarLink from "@f/sidebar/components/SidebarLink";
import { URL_DASHBOARD, URL_DEV, URL_LISTING_LIST, URL_PRODUCT_LIST, URL_USER_LIST } from "@/utils/links";
import SidebarButton from "@/components/layout/SidebarButton";

export default function SidebarDashboard() {

    return (
        <ul className="list-group list-group-flush">


            <div className="mt-2 mb-4">
                <SidebarButton />
            </div>

            <SiderbarLink
                className='mb-4'
                to={URL_DASHBOARD}
                icon="bi-gear"
                label="panel"
            />


            <SiderbarLink
                className="mb-4"
                to={URL_LISTING_LIST}
                icon="bi-sticky"
                label="listings"
            />

            <SiderbarLink
                className="mb-4"
                to={URL_PRODUCT_LIST}
                icon="bi-box-seam"
                label="products"
            />

            <SiderbarLink
                 className="mb-4"
                to={URL_USER_LIST}
                icon="bi-person"
                label="users"
            />


            <SiderbarLink
                className="mb-3"
                to={URL_DEV}
                icon="bi-terminal"
                label="demo"
            />


        </ul>

    )
}
