// ProductLayout.jsx
import { Outlet } from 'react-router-dom';

export default function CatalogeLayout(){
  return (
    <div>
      {/* Componentes comunes a todas las rutas de productos */}
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
};