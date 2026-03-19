import {Link} from "react-router-dom";
import React from "react";

function CrudHeader({title,subtitle}) {
    return (
        <div className="w-100 d-flex flex-wrap mt-2 mb-4">
            <Link to={'/dashboard'} className={`text-decoration-none text-dark`} >
                <i className="bi bi-chevron-left me-2 border p-2 me-3 rounded text-muted"
                   style={{opacity: '.6', background: ''}}></i>
                <span style={{fontSize: '1.4rem'}} className="text-capitalize fw-semibold me-3" >
                                 {title}
                       </span>
            </Link>
            <span style={{lineHeight: '2.3rem'}} className="text-secondary">
                              {subtitle}
                   </span>
        </div>
    )
}

export default CrudHeader;