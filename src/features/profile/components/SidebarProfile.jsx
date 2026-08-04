
import { Tintify } from "@/features/product/components/FloatButton";
import { Link, useNavigate } from "react-router-dom";

function SidebarProfile({ role, border = false }) {

    const navigate = useNavigate()

    return (
        <>
            <ul className="list-group list-group-flush">
 

                {role === 'ADMIN' && (
                    <Tintify 
                        className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                        action={() => navigate(`/user/dashboard`)}>
                        <i className="bi bi-gear fs-5 ps-0 p-2"></i>
                        <span> Dashboard </span>     
                    </Tintify> 
                )}

                {role === 'ADMIN' && (
                    <Tintify 
                        className={`border-bottom text-normalize w-100 justify-content-start`} 
                        action={() => navigate(`/user/activity`)}>
                        <i className="bi bi-bar-chart fs-5 ps-0 p-2"></i>
                        <span> Overview </span>     
                    </Tintify> 
                )}

                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(`/user/profile`)}>
                    <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                    <span> Profile </span>     
                </Tintify> 


                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(`/user/account`)}>
                    <i className="bi bi-person fs-5 ps-0 p-2"></i>
                    <span> Cuenta </span>     
                </Tintify>  

                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(`/user/purchases`)}>
                    <i className="bi bi-handbag fs-5 ps-0 p-2"></i>
                    <span> Compras</span>     
                </Tintify>                   
              
                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(`/user/favorites`)}>
                    <i className="bi bi-heart fs-5 ps-0 p-2"></i>
                    <span> Favoritos </span>     
                </Tintify>                  

            </ul>
        </>

    )
}

export default SidebarProfile;
