import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/AuthContext.jsx";
import { useUIContext } from "../../../contexts/UIContext.jsx";


function CrudDropdown({className, onShow, show}) {


  
  const handleToggle =  () =>  onShow(true)


  return (
    <>
      <Dropdown
        show={show}
        align="end"
        className={className}
        onToggle={handleToggle}
      >
        <Dropdown.Toggle
          id="user-dropdown"
          variant="light"
          className="border-0 bg-transparent p-0 no-caret"

        >
          <i className={`d-none d-md-block bi bi-three-dots`}></i>
        </Dropdown.Toggle>

          <Dropdown.Menu
            className={`shadow-sm`}
            style={{ minWidth: "220px" }}
          >

            <Dropdown.Item as={Link} to="user/favorites">
              <i className="bi bi-heart me-2"></i> favoritos
            </Dropdown.Item>

            <Dropdown.Item as={Link} to="/user/purchases">
              <i className="bi bi-handbag me-2"></i> compras
            </Dropdown.Item>
  
            <Dropdown.Item>
              <i className="bi bi-star me-2"></i> mode admin
            </Dropdown.Item>

          </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default CrudDropdown;
