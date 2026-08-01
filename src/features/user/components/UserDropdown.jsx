import { useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { useUIContext } from "../../../contexts/UIContext.jsx";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import { IconTint, Tintify } from "@features/product/components/FloatButton"
import ImageWithFallback from "@/components/common/ImageWithFallback.jsx";
import userDefault from "/user-default.png"



function UserDropdown({ className }) {


  const { user, isAuth, logout, isAdmin } = useAuthContext();
  const { setShowLoginModal, showLoginModal } = useUIContext()

  const [isActive, setIsActive] = useState(false)
  
  // si esta logeado activa el dropdown toggle, si no muestra LoginModal
  const handleToggle = (isOpen) => isAuth ? setIsActive(isOpen) : setShowLoginModal(true)

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const imgUrlFallback = `http://localhost:8080/api/image/95x95?
  &background=EEEEE&text=${user?.username[0]}
  &fontWeight=bolder&fontSize=50&textColor=fff`

  const imgUrlUser = `http://localhost:8080/uploads/users/${user?.username}.png`

  return (
    <>
      <Dropdown
        show={isActive}
        align="end"
        className={className}
        onToggle={handleToggle}
      >
        <Dropdown.Toggle
          id="user-dropdown"
          variant=""
          className="border-0 bg-transparent p-0 no-caret"

        >
          {!isAuth &&
            <IconTint 
              style={{ padding: '5px'}}
              icon={'person'}
              className={'fs-4 rounded-circle d-none d-md-block'}
            />
          }
          {isAuth && 
            <ImageWithFallback 
              className="rounded-circle border d-none d-md-block" 
              src={imgUrlUser}
              fallbackSrc={userDefault}
              width={30} 
              height={30}
              />

          }
          
        </Dropdown.Toggle>

        <Dropdown.Menu
          className={`shadow-sm`}
          style={{ minWidth: "220px" }}
        >
          {/* Perfil info */}
          <Dropdown.Item
            as={Link}
            to={`/user`}
            className="border-bottom py-2"
          >
            <div className="active-fix">
              <b className="fw-semibold">{user?.username}</b>
              <p className="m-0 small text-secondary">Ver perfil completo</p>
            </div>
          </Dropdown.Item>
  
          {/* Links de navegación */}
          {isAdmin && (
            <>  
              <Dropdown.Item as={Link} to="/dashboard">
                <i className="bi bi-gear me-2"></i> Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="user/activity">
                <i className="bi bi-bar-chart  me-2"></i> Overview
              </Dropdown.Item>
            </>
          )}

          <Dropdown.Item as={Link} to="user/favorites">
            <i className="bi bi-heart me-2"></i> Favoritos
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/user/purchases">
            <i className="bi bi-handbag me-2"></i> Compras
          </Dropdown.Item>
  
          <Dropdown.Divider />
  
          {/* Logout */}
          <Dropdown.Item as="div" className="text-center">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleLogout}
              className="w-100"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
