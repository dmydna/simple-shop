import { useAuth } from "@features/auth/hooks/AuthContext";
import CartButton from "@features/cart/components/CartButton.jsx";
import SiderbarLink from "./SidebarLink";
import { useUIContext } from "@/contexts/UIContext";

// Nota: esta sidebar es la version normal con navegacion global y admite ambos roles
export default function SidebarAppMobile({ onShow, expandable = true, toggle }) {

    const BASE_URL ='/dashboard'
    const {isAdmin} = useAuth()

  

    return (
        <ul style={{width: "500px"}} className="mx-3 mx-sm-auto list-group list-group-flush flex-row justify-content-between">


            <SiderbarLink
                to={`/`}
                icon="bi-house"
                label="homes"
            />

            <SiderbarLink
                to={`/products`}
                icon="bi-list-ul"
                label="products"
            />

            <SiderbarLink
                onclick={()=>toggle("/user")}
                to={`/user`}
                icon="bi-person"
                label="account"
            />

           {isAdmin && (
            <SiderbarLink
                onclick={()=>toggle("/dashboard")}
                to={`/dashboard`}
                icon="bi-list-nested"
                label="dashboard"
            />
            )}

            <CartButton/> 



        </ul>

    )
}
