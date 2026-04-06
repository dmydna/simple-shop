// DashboardLayout.jsx
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      {/* Componentes comunes a todas las rutas de productos */}
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
};

export default DashboardLayout;