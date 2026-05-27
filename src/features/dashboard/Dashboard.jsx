
import ListingList from "./components/listing/ListingList";
import ListingActions from "./components/listing/ListingActions";
import ListingForm from "./components/listing/ListingForm";
import ListingLayout from "./components/listing/ListingLayout";
import ProductActions from "./components/product/ProductActions";
import ProductForm from "./components/product/ProductForm";
import ProductLayout from "./components/product/ProductLayout";
import ProductList from "./components/product/ProductList";
import UserActions from "./components/user/UserActions";
import UserForm from "./components/user/UserForm";
import UserLayout from "./components/user/UserLayout";
import UserList from "./components/user/UserList";



function Dashboard(){

    return <></>
}


Dashboard.ListingForm = ListingForm
Dashboard.ListingList=  ListingList
Dashboard.ListingActions= ListingActions
Dashboard.ListingLayout = ListingLayout
Dashboard.ProductForm = ProductForm
Dashboard.ProductList=  ProductList
Dashboard.ProductLayout = ProductLayout
Dashboard.ProductActions= ProductActions
Dashboard.UserForm= UserForm
Dashboard.UserList= UserList
Dashboard.UserActions= UserActions
Dashboard.UserLayout = UserLayout 
export default Dashboard;