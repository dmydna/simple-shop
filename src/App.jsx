import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/common/Footer";
import NavHeader from "./components/common/NavHeader";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CRUDWrapper } from "./contexts/CRUDWrapper";
import Admin from "./pages/Admin";
import Carrito from "./pages/Cart";
import ClientCRUD from "./pages/ClientCRUD";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ListingCRUD from "./pages/ListingCRUD";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductCRUD from "./pages/ProductCRUD";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/ProductList";
import "./styles/index.css";
import ListingDraft from "./pages/ListingDraft";
import User from "./pages/User"

function App() {
 


  const navItems = ["Inicio", "Productos", "Contacto"];
  const [seccion, setSeccion] = useState("Inicio");

  const navFix = 'mt-5 pt-5';

  const location = useLocation()

  useEffect(()=>{
    if(location.pathname.startsWith('/contacto') || location.pathname.startsWith('/login') ) 
     {
      document.querySelector('body')?.classList.add('bg-full-heaven')
    }else{
      document.querySelector('body')?.classList.remove('bg-full-heaven')
    }
  },[location])



  return (
    <AuthProvider>
    <CRUDWrapper>
    <div className="d-flex flex-column min-vh-100 pt-3">
        

     <NavHeader  items={navItems} onSeleccion={setSeccion} />
        {/* <Header />
        <Nav items={navItems} seccion={seccion} onSeleccion={setSeccion}/> */}
      <main className={`flex-grow-1 p-3 px-0 ${navFix}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/user/:page" element={
            <> 
              <User /> 
            </>}>
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
          {/* <Route path="/productos/filter/" element={
            <> 
            <Products/>
            </>
          }
          />  */}
          <Route path="/productos/search/:product" element={
            <> 
            <Products/>
            </>
          }
          />         
          <Route path="/productos/:hash/:name" element={
              <ProductDetails /> 
            } 
          />
          <Route path="/dashboard/draft" element={
              <ListingDraft /> 
            } 
          />
          <Route path="/productos" element={
            <Products/>
            }
          />
          <Route path="/admin/:manager" element= {             
             <ProtectedRoute>
               {/* <AdminProductTable /> */}
                <ListingCRUD /> 
             </ProtectedRoute>} />
          <Route path="/dashboard/" element={
             <Dashboard /> 
          } />

          <Route path="/dashboard/products" element={
             <ProductCRUD /> 
          } />

          <Route path="/dashboard/products/create" element={
             <ProductCRUD /> 
          } />

          <Route path="/dashboard/listing" element={
             <>
                <ListingCRUD /> 
             </> 
            } 
          />
          <Route path="/dashboard/clients" element={ 
            <>
            <ClientCRUD  />
            </>} />
          {/* Ruta para no coincidencias */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        <ToastContainer limit={3} />
      </main>
      <Footer />
    </div>
    </CRUDWrapper>
    </AuthProvider>
  );
}

export default App;
