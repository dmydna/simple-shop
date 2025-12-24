import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUIContext } from "../contexts/UIContext";


function UserDropdown({className}) {


  const { user, isAuth, logout } = useAuth();
  const {onHideLogin} = useUIContext()

  const [isActive, setIsActive] = useState(false)
  
  // si esta logeado activa el dropdown toggle, si no muestra LoginModal
  const handleToggle =  (isOpen) =>  isAuth ? setIsActive(isOpen) : onHideLogin(true)

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


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
          variant="light"
          className="border-0 bg-transparent p-0 no-caret"

        >
          <i className={`d-none d-md-block h3 bi bi-person${isAuth ? '-fill' : ''} hover-icon m-0`}></i>
        </Dropdown.Toggle>

          <Dropdown.Menu
            className={`shadow-sm`}
            style={{ minWidth: "220px" }}
          >
            {/* Perfil info */}
            <Dropdown.Item
              as={Link}
              to={`/perfil/${user}`}
              className="border-bottom py-2"
            >
              <div>
                <b className="fw-semibold">{user}</b>
                <p className="m-0 small text-secondary">Ver perfil completo</p>
              </div>
            </Dropdown.Item>
  
            {/* Links de navegación */}
            <Dropdown.Item as={Link} to={`/perfil/${user}`}>
              <i className="bi bi-person me-2"></i> Perfil
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/dashboard">
              <i className="bi bi-gear me-2"></i> Dashboard
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