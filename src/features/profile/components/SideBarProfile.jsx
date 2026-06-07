
import { Link } from "react-router-dom";

function SideBarProfile({ role, border=false }) {


    return (
        <>
            <ul className="list-group list-group-flush">
 

                {role === 'ADMIN' && (
                    <li className={`list-group-item ${border ? '': 'border-0'}`}>
                        <Link className="text-normalize" to={`/user/activity`}>
                            <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                            <span> Actividad </span>
                        </Link>
                    </li>
                )}

                {role === 'ADMIN' && (
                    <li className={`list-group-item ${border ? '': 'border-bottom'}`}>
                        <Link className="text-normalize" to={`/user/dashboard`}>
                            <i className="bi bi-sliders fs-5 ps-0 p-2"></i>
                            <span> Dashboard </span>
                        </Link>
                    </li>
                )}

                    <li className={`list-group-item ${border ? '': 'border-0'}`}>
                        <Link className="text-normalize" to={`/user/profile`}>
                            <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                            <span> Profile </span>
                        </Link>
                    </li>


                <li className={`list-group-item ${border ? '': 'border-0'}`}>
                    <Link className="text-normalize" to={`/user/account`}>
                        <i className="bi bi-person fs-5 ps-0 p-2"></i>
                        <span> Cuenta </span>
                    </Link>
                </li>

                    <li className={`list-group-item ${border ? '': 'border-0'}`}>
                        <Link className="text-normalize" to={`/user/purchases`}>
                            <div className="item">
                                <i className="bi bi-handbag fs-5 ps-0 p-2"></i>
                                <span> compras</span>
                            </div>
                        </Link>
                    </li>
                
                    <li className={`list-group-item ${border ? '': 'border-0'}`}>
                        <Link className="text-normalize" to={`/user/reviews`}>
                            <div className="item">
                                <i className="bi bi-star fs-5 ps-0 p-2"></i>
                                <span> reseñas </span>
                            </div>
                        </Link>
                    </li>
               
                    <li className={`list-group-item ${border ? '': 'border-0'}`}>
                        <Link className="text-normalize" to={`/user/favorites`}>
                            <div className="item">
                                <i className="bi bi-heart fs-5 ps-0 p-2"></i>
                                <span> favoritos </span>
                            </div>
                        </Link>
                    </li>
               

            </ul>
        </>

    )
}

export default SideBarProfile;
