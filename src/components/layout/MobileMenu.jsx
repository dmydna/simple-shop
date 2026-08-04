import { useNavbarContext } from "@/contexts/NavbarContext.jsx";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import SideBarDashboard from "@/features/dashboard/common/SiderbarDashboard.jsx";
import SidebarProfile from "@/features/profile/components/SidebarProfile.jsx";
import { Button, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";


function MobileMenu({ children }) {

  // TODO: usar searchParams para MobileMenu
  const {showMenu, setShowMenu} = useNavbarContext()


  const location = useLocation()

  const navigate = useNavigate()
  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  const { isAuth, logout } = useAuthContext();

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
      <Button className="d-none" variant="light" onClick={handleShow}>
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
                    <SidebarProfile border={false} role={'CLIENT'} />
                  </div>
                )}

                {/*HACK: agregar acordion en menu mobile*/}
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
                    <SideBarDashboard showIcons/> 
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
