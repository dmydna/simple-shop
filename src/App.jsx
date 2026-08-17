import "@/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "@common/ProtectedRoute";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin.jsx";
import { ProviderWrapper } from "@contexts/ProviderWrapper";
import Dashboard from "@dashboard/common/Dashboard";
import Footer from "@layout/Footer.jsx";
import Navbar from "@layout/Navbar.jsx";
import { ToastContainer } from "react-toastify";


import Cart from "@pages/Cart/Cart.jsx";
import Contact from "@pages/Contact";
import Home from "@pages/Home";
import ProductDetails from "@pages/Product/ProductDetails";
import Products from "@pages/Product/ProductListing";

import ChangePassword from "@pages/ChangePassword";
import CompleteRegister from "@pages/CompleteRegister";
import Login from "@pages/Login";
import Register from "@pages/Register.jsx";

import Page404NotFound from "@features/fallback/Page404NotFound.jsx";
import PageNotReady from "@features/fallback/PageNotReady";

import ProfileLayout from "@/features/profile/components/ProfileLayout";
import MyAccount from "@features/profile/components/MyAccount";
import MyActivity from "@features/profile/components/MyActivity";
import MyDashboard from "@features/profile/components/MyDashboard";
import MyFavorites from "@features/profile/components/MyFavorites";
import MyPhotoProfile from "@features/profile/components/MyPhotoProfile";
import MyProfile from "@features/profile/components/MyProfile";
import MyPurchases from "@features/profile/components/MyPurchases";
import WelcomePerfil from "@features/profile/components/WelcomeProfile";

import { ListingCrudProvider } from "@features/listing/contexts/ListingCrudContext";
import { ProfileProvider } from "@features/profile/contexts/ProfileContext.jsx";
import { UserProvider } from "@features/user/contexts/UserContext.jsx";

import DemoUploader from "@/dev/components/DemoUploader";
import SmartSidebarApp from "@components/layout/SmartSidebarApp";
import WelcomeDashboard from "@features/dashboard/common/WelcomeDashboard";
import DashboardLayout from "@features/dashboard/layout/DashboardLayout";
import ListingForm from "@features/dashboard/listing/ListingForm";
import ListingList from "@features/dashboard/listing/ListingList";
import PaymentForm from "@features/payment/components/PaymentForm.jsx";

import CatalogeLayout from "@components/layout/CatalogeLayout";
import ChangeMail from "@pages/ChangeMail";
import OrderDetails from "@pages/OrderDetails";

// DONE: update listing

function App() {

  const navItems = ["Home", "Products", "Contact"];
  const [seccion, setSeccion] = useState("Home");

  const navFix = 'pt-4';

  return (

    <ProviderWrapper>

      <div id="content" className="d-flex flex-column min-vh-100 pt-4 mt-4">

        <Navbar items={navItems} onSeleccion={setSeccion} />

        <main className={`flex-grow-1 p-3 px-0 ${navFix}`}>

          <SmartSidebarApp />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-email" element={<ChangeMail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/order/:hash"  element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>  
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/complete-registration" element={
              <ProfileProvider>
                <CompleteRegister />
              </ProfileProvider>
            }></Route>
            <Route path="/test/uploader" element={<DemoUploader />} />
            <Route path="/faqs" element={<PageNotReady />} />
            
            <Route path="/p/:hash" element={<ProductDetails />} />

            <Route path="/products" element={<CatalogeLayout />}>
              <Route index element={<Products />} />
              <Route path="category/:category" element={<Products />} />
              <Route path=":filter" element={<Products />} />
              <Route path="search/:product" element={<Products />} />
              <Route path=":hash/:name" element={<ProductDetails />} />
            </Route>

            <Route path="/user" element={
              <ProtectedRoute>
                <UserProvider>
                  <ProfileProvider>
                    <ProfileLayout />
                  </ProfileProvider>
                </UserProvider>
              </ProtectedRoute>
            }>
              <Route index element={<WelcomePerfil />} />
              <Route path="account" element={<MyAccount />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="favorites" element={<MyFavorites />} />
              <Route path="photo" element={<MyPhotoProfile />} />
              <Route path="activity" element={<MyActivity />} />
              <Route path="purchases" element={<MyPurchases />} />
              <Route path="dashboard" element={<MyDashboard />} />

            </Route>
            <Route path="/admin">
                
              <Route index element={
                <DashboardLayout>
                  <WelcomeDashboard />
                </DashboardLayout>
              } />


              <Route path="dashboard" element={
                <DashboardLayout>
                  <WelcomeDashboard />
                </DashboardLayout>
              } />

              <Route path="dev" element={<DemoUploader />} />

              {/* LISTING  */}
              <Route path="listing-form" element={
                <Dashboard.ListingLayout>
                  <Dashboard.ListingForm />
                </Dashboard.ListingLayout>
              } />

              <Route path="listing-list" element={
                <Dashboard.ListingLayout>
                  <Dashboard.ListingList />
                </Dashboard.ListingLayout>

              } />


              {/* PRODUCT  */}
              <Route path="product-form" element={
                <Dashboard.ProductLayout>
                  <Dashboard.ProductForm />
                </Dashboard.ProductLayout>
              } />
              <Route path="product-list" element={
                <Dashboard.ProductLayout>
                  <Dashboard.ProductList />
                </Dashboard.ProductLayout>
              } />

              {/* USER  */}
              <Route path="user-form" element={
                <Dashboard.UserLayout>
                  <Dashboard.UserForm />
                </Dashboard.UserLayout>

              } />
              <Route path="user-list" element={
                <Dashboard.UserLayout >
                  <Dashboard.UserList />
                </Dashboard.UserLayout>

              } />

            </Route>




            <Route path="/cart" element={
              <ProtectedRoute>
                <ProfileProvider>
                  <Cart />
                </ProfileProvider>
              </ProtectedRoute>
            }>
              <Route index element={<Cart />} />
              <Route path=":buy" element={<PaymentForm />} />
            </Route>




            {/** -- DASHBOARD CRUD -- */}

            <Route path="/dashboardmode" element={<DashboardLayout />}>
              <Route index element={<ListingForm />} />
              <Route path="product-crud" element={
                <ListingCrudProvider>
                  <ListingForm />
                </ListingCrudProvider>
              } />
              <Route path="product-table" element={
                <ListingCrudProvider>
                  <ListingList />
                </ListingCrudProvider>
              } />
            </Route>



            <Route path="/dashboard/" element={
              <ProtectedRouteAdmin>
                <Dashboard />
              </ProtectedRouteAdmin>
            } />


            {/** -- PAGE 404 -- */}
            <Route path="*" element={<Page404NotFound />} />

          </Routes>
          <ToastContainer 
            hideProgressBar={true} 
            autoClose={1000} 
            position="bottom-left"
            limit={3} 
          />

        </main>
        <Footer />
      </div>
    </ProviderWrapper>

  );
}

export default App;
