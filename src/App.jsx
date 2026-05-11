import Dashboard from "@features/dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProtectedRouteAdmin from "./components/common/ProtectedRouteAdmin.jsx";
import Footer from "./components/layout/Footer.jsx";
import NavHeader from "./components/layout/NavHeader.jsx";
import { CRUDWrapper } from "./contexts/CRUDWrapper";
import DevDash from "./dev/components/DevDash.jsx";
import { AuthProvider } from "./features/auth/hooks/AuthContext.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/Product/ProductDetails";
import Products from "./pages/Product/ProductListing";
import Register from "./pages/Register.jsx";
import Page404NotFound from "./pages/errors/Page404NotFound.jsx";
import "./styles/index.css";

import MyPhotoProfile from "@/features/profile/components/MyPhotoProfile";
import MyAccount from "@features/profile/components/MyAccount";
import MyActivity from "@features/profile/components/MyActivity";
import MyDashboard from "@features/profile/components/MyDashboard";
import MyFavorites from "@features/profile/components/MyFavorites";
import MyProfile from "@features/profile/components/MyProfile";
import MyPurchases from "@features/profile/components/MyPurchases";
import MyReviews from "@features/profile/components/MyReviews";
import UserLayout from "@features/profile/components/UserLayout";
import WelcomePerfil from "@features/profile/components/WelcomeProfile";

import PageNotReady from "@pages/errors/PageNotReady";
import SiderbarAdmin from "./components/layout/SiderbarAdmin";
import UploadService from "./dev/components/UploadService";
import { DevProvider } from "./dev/contexts/DevContext.jsx";
import WelcomeDashboard from "./features/dashboard/common/WelcomeDashboard";
import ListingList from "./features/dashboard/components/listing/LisitingList";
import ListingForm from "./features/dashboard/components/listing/ListingForm";
import DashboardLayout from "./features/dashboard/layout/DashboardLayout";
import { ListingCrudProvider } from "./features/listing/contexts/ListingCrudContext";
import PaymentForm from "./features/payment/components/PaymentForm.jsx";
import WriteReview from "./features/profile/components/WriteReview";
import { ProfileProvider } from "./features/profile/contexts/ProfileContext.jsx";
import { UserProvider } from "./features/user/contexts/UserContext.jsx";
import CompleteRegister from "./pages/CompleteRegister";
import CatalogeLayout from "@/components/layout/CatalogeLayout";


function App() {


  const navItems = ["Inicio", "Products", "Contacto"];
  const [seccion, setSeccion] = useState("Inicio");

  const navFix = 'pt-5';

  const location = useLocation()

  useEffect(() => {
    if (
      location.pathname.startsWith('/login') ||
      location.pathname.startsWith('/contacto') ||
      location.pathname.startsWith('/auth') ||
      location.pathname.startsWith('/register') ||
      location.pathname.startsWith('/register/complete')
    ) {
      document.querySelector('body')?.classList.add('bg-full-heaven')
    } else {
      document.querySelector('body')?.classList.remove('bg-full-heaven')
    }
  }, [location])


  return (
    <AuthProvider>
      <CRUDWrapper>
        <div id="content" className="d-flex flex-column min-vh-100 pt-3">


          (<NavHeader items={navItems} onSeleccion={setSeccion} />)

          <main className={`flex-grow-1 p-3 px-0 ${navFix} `}>

            <SiderbarAdmin />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/inicio" element={<Home />} />

              <Route path="/contacto" element={<Contact />} />
              <Route path="/register/complete" element={
                <ProfileProvider>
                  <CompleteRegister />
                </ProfileProvider>
              }></Route>
              <Route path="/test/uploader" element={<UploadService />} />
              <Route path="/faqs" element={<PageNotReady />} />

              <Route path="/products" element={<CatalogeLayout/>}>
                <Route index element={<Products />} />
                <Route path="category/:category" element={<Products />} />
                <Route path="search/:product" element={<Products />} />
                <Route path=":hash/:name" element={<ProductDetails />} />
              </Route>

              <Route path="/user" element={
                <ProtectedRoute>
                  <UserProvider>
                    <ProfileProvider>
                      <UserLayout />
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
                <Route path="reviews" element={<MyReviews />} />
                <Route path="dashboard" element={<MyDashboard />} />
                <Route path="write-review" element={<WriteReview />} />


              </Route>
              <Route path="/dashboard">
                
                <Route index element={
                  <DashboardLayout>
                    <WelcomeDashboard />
                  </DashboardLayout>
                } />

                <Route path="dev" element={<UploadService />} />


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
                    <Dashboard.ProductForm/>
                  </Dashboard.ProductLayout>
                }/>
                <Route path="product-list" element={
                  <Dashboard.ProductLayout>
                    <Dashboard.ProductList />
                  </Dashboard.ProductLayout>
                }/>

                {/* USER  */}
                <Route path="user-form" element={
                    <Dashboard.UserLayout>
                      <Dashboard.UserForm/>
                    </Dashboard.UserLayout>

                }/>
                <Route path="user-list" element={
                    <Dashboard.UserLayout >
                       <Dashboard.UserList />
                    </Dashboard.UserLayout>

                }/>

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


              <Route path="/dashboard/dev" element={
                <DevProvider>
                  <DevDash />
                </DevProvider>
              }
              />


              {/** -- PAGE 404 -- */}
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
