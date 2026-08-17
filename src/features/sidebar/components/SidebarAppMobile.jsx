import CartButton from "@features/cart/components/CartButton.jsx";
import SiderbarLink from "@f/sidebar/components/SidebarLink";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { useNavigate } from "react-router-dom";


// Nota: esta sidebar es la version normal con navegacion global y admite ambos roles
export default function SidebarAppMobile({ onShow, expandable = true }) {

    const { isAuth } = useAuthContext()
    const BASE_URL ='/dashboard'
    const {isAdmin} = useAuthContext()
    const navigate = useNavigate()

  

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
                to={`${isAuth ? '/user' : '/login'}`}
                icon="bi-person"
                label="account"
            />

            {isAdmin && (
                <SiderbarLink
                    to={`/dashboard`}
                    icon="bi-list-nested"
                    label="panel"
                />
            )}

            <div>
             <CartButton/> 
              <p style={{fontSize: ".700rem"}} className="m-0 mt-2 text-center">cart</p>
            </div>


        </ul>

    )
}
