import SideBarDashboard from "@/features/dashboard/layout/SiderbarDashboard.jsx";
import SideBarProfile from "@/features/profile/components/SideBarProfile.jsx";
import { Button, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUIContext } from "../../contexts/UIContext.jsx";
import { useAuth } from "../../features/auth/hooks/AuthContext.jsx";


function MobileMenu({ children }) {

  const { showMenu, onHideMenu } = useUIContext()

  const location = useLocation()

  const navigate = useNavigate()
  const handleClose = () => onHideMenu(false);
  const handleShow = () => onHideMenu(true);

  const { isAuth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    showMenu &&
      handleClose()
    navigate('/login');
  }

  const handleRegister = () => {
    showMenu &&
      handleClose()
    navigate('/register');
  }



  return (
    <>
      <Button className="d-md-none" variant="light" onClick={handleShow}>
        <span className="navbar-toggler-icon"></span>
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
                  <i className="bi bi-box-arrow-in-left me-2"></i>
                  Iniciar sesión
                </Button>

                <Button
                  variant="outline-dark"
                  className="py-3 fw-medium fs-5 w-100"
                  style={{ opacity: 0.8 }}
                  onClick={handleRegister}
                >
                  Registrarse
                </Button>
              </div>
            </>
          ) : (
            <>
              <Nav className="me-auto w-100 border-bottom">

                <Nav.Link
                  key={'/user'}
                  onClick={handleClose}
                  as={Link}
                  to={'/user'}
                  className="fw-semibold fs-5 py-2 m-1"
                >
                  User
                </Nav.Link>

                {location.pathname.startsWith('/user') && (
                  <div className="border-top py-3 pb-4 border-bottom">
                    <SideBarProfile border={false} role={'CLIENT'} />
                  </div>
                )}


                <Nav.Link
                  key={'/dashboard'}
                  onClick={handleClose}
                  as={Link}
                  to={'/dashboard'}
                  className="fw-semibold fs-5 py-2 m-1"
                >
                  Dashboard
                </Nav.Link>

                {location.pathname.startsWith('/dashboard') && (
                  <div className="border-top py-3 pb-4">
                    <SideBarDashboard /> 
                  </div>
                )}


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
