import ProtectedRoute from "@/components/common/ProtectedRoute";
import { UserProvider } from "@/features/user/contexts/UserContext";
import { Route } from "react-router-dom";
import MyAccount from "./MyAccount";
import MyActivity from "./MyActivity";
import MyDashboard from "./MyDashboard";
import MyFavorites from "./MyFavorites";
import MyPhotoProfile from "./MyPhotoProfile";
import MyProfile from "./MyProfile";
import MyPurchases from "./MyPurchases";
import MyReviews from "./MyReviews";
import UserLayout from "./UserLayout";
import WelcomePerfil from "./WelcomeProfile";

function UserProfileRoutes(){
 
  retrun (<>
    <Route path="/user" element={
      <ProtectedRoute>
        <UserProvider>
          <UserLayout />
        </UserProvider>
      </ProtectedRoute>
    }>
      <Route index element={<WelcomePerfil />} />
      <Route path="account" element={<MyAccount />} />
      <Route path="profile" element={<MyProfile/>} />
      <Route path="favorites" element={<MyFavorites/>} />
      <Route path="photo" element={<MyPhotoProfile/>} />
      <Route path="activity" element={<MyActivity />} />
      <Route path="purchases" element={<MyPurchases />} />
      <Route path="reviews" element={<MyReviews />} />
      <Route path="dashboard" element={<MyDashboard />} />
    </Route>
  </>)
};

export default UserProfileRoutes;