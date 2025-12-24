import React from "react";
import { Button, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUIContext } from "../contexts/UIContext";


function MobileMenu({children}) {

  const {showMenu, onHideMenu  } = useUIContext()


  const navigate = useNavigate()
  const handleClose = () => onHideMenu(false);
  const handleShow = () => onHideMenu(true);

  const { isAuth,  logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    showMenu &&
    handleClose()
    navigate('/login');
  }

  return (
    <>
      <Button className="d-md-none" variant="light" onClick={handleShow}>
        <span class="navbar-toggler-icon"></span>
      </Button>
      <Offcanvas show={showMenu} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          {/* <Logo></Logo> */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-5">
        {!isAuth ? (
          <>
          {children}

          <div className="mt-5">
            <Button
              variant="primary"
              className="py-3 fw-medium fs-5 w-100 mb-3"
              style={{ opacity: 0.8 }}
              onClick={handleLogin}
            >
              <i class="bi bi-box-arrow-in-left me-2"></i>
              Iniciar sesión
            </Button>
    
            <Button
              variant="outline-dark"
              className="py-3 fw-medium fs-5 w-100"
              style={{ opacity: 0.8 }}
              onClick={handleLogin}
            >
              Registrarse
            </Button>
          </div>
          </>
          ) : (
          <>
          <Nav className="me-auto w-100 border-bottom">
            {[
              { to: '/perfil/admin', label: 'Perfil' },
              { to: '/dashboard', label: 'Dashboard' },
            ].map(({ to, label }) => (
              <Nav.Link
                key={to}
                onClick={handleClose}
                as={Link}
                to={to}
                className="fw-semibold fs-5 py-2 m-1"
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
    
          {children}
    
          <Button
            variant="danger"
            className="py-3 mt-5 fw-medium fs-5 w-100"
            style={{ opacity: 0.8 }}
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Cerrar sesión
          </Button>
          </>
          )}
      </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}




export default MobileMenu;