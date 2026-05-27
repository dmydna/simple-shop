import React, { useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import CopyButton from "@/components/common/CopyButton";
import LockButton from "@/components/common/LockButton";
import {CRUD} from "@utils/enums"


const CompactDateInput = ({hook, name, label, crudHook}) => {

  const { formData, handleChange, crudMode,
  isDisabledField, editableFields, handleEnableEdit } = crudHook


  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      // Intento 1: Usar showPicker() si el navegador lo soporta (abre el diálogo nativo directamente)
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        // Intento 2: Fallback para navegadores más antiguos
        inputRef.current.focus();
        inputRef.current.click(); // Simular clic en el input real
      }
    }
  };


  return (
    <div 
      className="mb-3"
      onClick={handleClick}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        cursor: 'pointer',
        position: 'relative',
        padding: '2px 6px',
        borderRadius: '4px',
        width: '100%',
        minWidth: '250px',
        border: '1px solid #ced4da',
        backgroundColor: `${isDisabledField(name) ? '#eeee': '#fff'}`, 
        userSelect: 'none' // Evita que se seleccione el texto al hacer clic rápido
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ced4da'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ced4da'}
    >

      <span className={`small ${isDisabledField(name) ? 'text-secondary' : 'fw-semibold'}  m-0 me-1`}>{label}: </span>
      
      {/* Input invisible pero funcional */}
      <Form.Control
        name={name}
        disabled={isDisabledField(name)}
        ref={inputRef}
        type="datetime-local"
        value={formData?.[name] || ""}
        onChange={handleChange}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          margin: 0,
          zIndex: 1 // Asegura que esté por encima visualmente en el stack
        }}
        aria-label="Seleccionar fecha y hora"
      />

      {/* Texto visible */}
      <span className={`small ${isDisabledField(name) ? 'text-reset' : 'text-secondary'}  mx-2`}>
        {formData?.[name] ? new Date(formData?.[name]).toLocaleString() : "PERMANENT"}
      </span>

      <i style={{right: "4px"}} 
        className={`${isDisabledField(name) ? 'd-none' : 'd-inline'} position-absolute bi bi-chevron-expand`}></i>

      {crudMode == CRUD.UPDATE && (
        <LockButton
          style={{ top: 11, right: 3, opacity: '.7' }}
          className="pointer position-absolute"
          locked={editableFields[name]}
          handle={() => handleEnableEdit(name)}
          />
          )}
      {crudMode === CRUD.READ && (
        <CopyButton
          style={{ top: 0, right: 0, opacity: '.7', zIndex: 999 }}
          className="pointer position-absolute"
          showMessage={false}
          value={formData?.[name]}
          />
          )}

    </div>
    );
};

export default CompactDateInput;