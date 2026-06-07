import React, { useState } from "react";

export function IconFill({action, children, icon, className}){
	
	
	const [isHovered, setIsHovered] = useState(false);
	const iconClass = isHovered ? `bi-${icon}-fill` : `bi-${icon}`

	return (
	    <span onClick={action} 
	    	  onMouseEnter={()=>setIsHovered(true)} 
	    	  onMouseLeave={()=>setIsHovered(false)} 
            style={{lineHeight:'0px', padding: '10px'}}
            className={`btn ${className || ''} z-index-10`}>
            <i className={iconClass}></i> 
            {children}
        </span>
     )
}





export function IconTint({ action, children, icon, className }) {
  const [isHovered, setIsHovered] = useState(false);
  const iconClass = `bi-${icon}`
  return (
    <span
      onClick={action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        lineHeight: '0px',
        padding: '10px',
        position: 'relative', // Necesario para posicionar el overlay
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={`btn ${className || ''}`}
    >
      {/* Overlay oscuro al hacer hover */}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscuro levemente
            borderRadius: 'inherit', // Si el botón tiene border-radius
            pointerEvents: 'none', // Permite que el clic llegue al span padre
            zIndex: 1
          }}
        />
      )}

      {/* El icono con la clase dinámica */}
      <i className={iconClass} style={{ zIndex: 2, position: 'relative' }}></i>
      
      {/* Contenido secundario (texto, etc.) */}
      {children && <span style={{ zIndex: 2, position: 'relative', marginLeft: '8px' }}>{children}</span>}
    </span>
  );
}



export function Tintify({ action, children, className }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      onClick={action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        lineHeight: '0px',
        padding: '10px',
        position: 'relative', // Necesario para posicionar el overlay
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className={`btn ${className || ''}`}
    >
      {/* Overlay oscuro al hacer hover */}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscuro levemente
            borderRadius: 'inherit', // Si el botón tiene border-radius
            pointerEvents: 'none', // Permite que el clic llegue al span padre
            zIndex: 1
          }}
        />
      )}

      {/* Contenido secundario (texto, etc.) */}
      {children && <span style={{ zIndex: 2, position: 'relative' }}>{children}</span>}
    </span>
  );
}