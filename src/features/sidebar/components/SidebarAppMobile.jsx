import CartButton from "@features/cart/components/CartButton.jsx";
import SiderbarLink from "@f/sidebar/components/SidebarLink";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";


// Nota: esta sidebar es la version normal con navegacion global y admite ambos roles
export default function SidebarAppMobile({ onShow, expandable = true, toggle }) {

    const { isAuth } = useAuthContext()
    const BASE_URL ='/dashboard'
    const {isAdmin} = useAuthContext()

  

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
                to={`${isAuth ? '/user' : '/login'}`}
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
