import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/layout/Footer.jsx";
import NavHeader from "./components/layout/NavHeader.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./features/auth/hooks/AuthContext.jsx";
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
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/ProductList";
import "./styles/index.css";
import ListingDev from "./dev/ListingDev.jsx";
import UserProfile from "./pages/UserProfile.jsx"
import ProtectedRouteListing from "./components/common/ProtectedRouteListing.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRouteAdmin from "./components/common/ProtectedRouteAdmin.jsx";
import PageLoading from "./pages/PageLoading.jsx";
import {FormCreater} from "./features/crud/FormCreater.jsx";
import {Col} from "react-bootstrap";
import {TagsList} from "./features/crud/TagsList.jsx";
import Page404NotFound from "./pages/Page404NotFound.jsx";
import {listingDataList} from "./dev/listingDataList.js";
import ListingCrudNext from "./pages/ListingCrudNext.jsx";
import FormProductSearch from "./features/listing/components/FormProductSearch.jsx";
import ProductCrudTable from "./features/product/components/ProductCrudTable.jsx";
import ProductCrudNext from "./pages/ProductCrudNext.jsx";



function App() {

  const navItems = ["Inicio", "Productos", "Contacto"];
  const [seccion, setSeccion] = useState("Inicio");

  const navFix = 'mt-5 pt-5';

  const location = useLocation()

  useEffect(()=>{
    if(
        location.pathname.startsWith('/login') ||
        location.pathname.startsWith('/contacto') ||
        location.pathname.startsWith('/auth') ||
        location.pathname.startsWith('/register') )
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
          <Route path="/register" element={<Register />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/user/:page" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>}>
          </Route>
          <Route path="/user" element={
            <ProtectedRoute>
              <UserProfile />
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
         <Route path="/test" element={ <PageLoading /> }></Route>
         <Route path="/test/tags" element={
             <TagsList
                 className={'bg-light border island p-4 p-md-5'} style={{maxWidth: 500}}
                 array={["hola","chau","gato","perro"]}
             />} />
         <Route path="/test/form" element={
            <FormCreater
                 className={'bg-light border island p-4 p-md-5'} style={{maxWidth: 500}}
                 objeto={listingDataList[0]}
                 onSubmit={(data)=>{console.log(data)}}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <p className="fs-3 m-0">Form Creator</p>
                </div>
            </FormCreater>} />
            <Route path="/test/product" element={
                <FormProductSearch />
            } />

          <Route path="/productos/category/:category" element={
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
          <Route path="/productos/:hash/:name" element={
              <ProductDetails /> 
            } 
          />
          <Route path="/dev" element={
              <ProductCrudNext />
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
            <ProtectedRouteAdmin>
              <Dashboard />
            </ProtectedRouteAdmin>
          } />


          <Route path="/dashboard/listing" element={
             <>
                <ListingCrudNext />
             </> 
            } 
          />
            <Route path="/dashboard/dev" element={
                <ListingDev />
            }
            />
            <Route path="/dashboard/product" element={
                    <ProductCrudNext />
            }
            />
          <Route path="/dashboard/clients" element={ 
            <>
            <ClientCRUD  />
            </>} />
          {/* Ruta para no coincidencias */}
          <Route path="*" element={<Page404NotFound />} />

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
