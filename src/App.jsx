import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavHeader from "./components/NavHeader";
import Pagination from "./components/Pagination";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CarritoProvider } from "./contexts/CartContext";
import { ProductosProvider } from "./contexts/ProductContext";
import Admin from "./pages/Admin";
import Carrito from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/ProductList";
import "./styles/index.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UIProvider } from "./contexts/UIContext";
import ProductCRUD from "./pages/ProductCRUD";
import ClientCRUD from "./pages/ClientCRUD";
import ClientTable from "./components/ClientTable";
import { ClientProvider } from "./contexts/ClientContext";

function App() {
 


  const navItems = ["Inicio", "Productos", "Contacto"];
  const [seccion, setSeccion] = useState("Inicio");

  const navFix = 'mt-5 pt-5';

  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.startsWith('/contacto') || location.pathname.startsWith('/login') ) 
     {
      document.querySelector('body')?.classList.add('bg-gradient-0')
    }else{
      document.querySelector('body')?.classList.remove('bg-gradient-0')
    }
  },[location])



  return (
    <AuthProvider>
    <UIProvider>
    <ProductosProvider>
    <CarritoProvider>
    <ClientProvider>
    <div className="d-flex flex-column min-vh-100 pt-3">
        

     <NavHeader  items={navItems} onSeleccion={setSeccion} />
        {/* <Header />
        <Nav items={navItems} seccion={seccion} onSeleccion={setSeccion}/> */}
      <main className={`flex-grow-1 p-3 px-0 ${navFix}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/perfil/:id" element={
            <ProtectedRoute> 
              <Perfil /> 
            </ProtectedRoute>}>
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>}>
          </Route>
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito"   element={<Carrito/>} />
          <Route path="/carrito/:buy" element={<Carrito/>} />
          <Route path="/productos/category/:category" element={
            <>
            <Products/>
            </>

          }
          /> 
          <Route path="/productos/filter/" element={
            <> 
            <Products/>
            </>
          }
          /> 
          <Route path="/productos/search/:product" element={
            <> 
            <Products/>
            </>
          }
          />         
          <Route path="/productos/details/:name" element={
              <ProductDetails /> 
            } 
          />
          <Route path="/productos" element={
            <> <Products/>
              <Pagination />
            </>}
          />
          <Route path="/admin/:manager" element= {             
             <ProtectedRoute>
               {/* <AdminProductTable /> */}
                <ProductCRUD /> 
                <Pagination />
             </ProtectedRoute>} />
          <Route path="/dashboard" element={
             <>
                <ProductCRUD /> 

             </> 
            } 
          />
          <Route path="/dashboard/clients" element={ 
            <>
            <ClientCRUD  />
            <Pagination />
            </>} />
          {/* Ruta para no coincidencias */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        <ToastContainer limit={3} />
      </main>
      <Footer />
    </div>
    </ClientProvider>
    </CarritoProvider>
    </ProductosProvider>
    </UIProvider>
    </AuthProvider>
  );
}

export default App;
