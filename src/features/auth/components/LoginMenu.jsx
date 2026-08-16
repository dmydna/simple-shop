import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "@f/auth/contexts/AuthContext.jsx";

function LoginMenu(){

    const { user } = useAuthContext();

    return(
        <Nav className="ms-auto w-100  align-items-left d-md-none">
             <div className="d-flex">
                <img  style={{fontSize: "60px"}} src="/user.png" />
                <div >  
                  <b style={{fontSize: "15px"}} className="m-0">{user}</b>
                  <Nav.Link  style={{fontSize: "13px"}} as={Link} to={'/profile'}  onClick={() => { }} >
                      Perfil
                  </Nav.Link>
                  </div>
             </div>

  
          <Nav.Link 
            as={Link} to={'/profile'}
            onClick={() => { }}
          >
            Dashboard
          </Nav.Link>
          <hr className="my-2"/>
      </Nav>
    )
}

export default LoginMenu