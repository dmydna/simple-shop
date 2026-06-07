
import ListingLayout from "@dashboard/layout/ListingLayout";
import ListingActions from "@dashboard/listing/ListingActions";
import ListingForm from "@dashboard/listing/ListingForm";
import ListingList from "@dashboard/listing/ListingList";

import UserLayout from "@dashboard/layout/UserLayout";
import UserActions from "@dashboard/user/UserActions";
import UserForm from "@dashboard/user/UserForm";
import UserList from "@dashboard/user/UserList";

import ProductLayout from "@dashboard/layout/ProductLayout";
import ProductActions from "@dashboard/product/ProductActions";
import ProductForm from "@dashboard/product/ProductForm";
import ProductList from "@dashboard/product/ProductList";



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