// ProductLayout.jsx
import { Outlet } from 'react-router-dom';

const ProductLayout = () => {
  return (
    <div>
      {/* Componentes comunes a todas las rutas de productos */}
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
};

export default ProductLayout;