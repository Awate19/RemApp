import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./signIn";
import Signup from "./signup";
import Home from "./home";
import Laptop from "./laptop";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Cart from "./cart";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import Product from "./Product";
import UpdateProduct from "./updateProduct";
import Desktop from "./desktop";
import Printer from "./printer";
import Monitor from "./monitor";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/laptop" exact component={Laptop} />
        <Route path="/printer" exact component={Printer} />
        <Route path="/desktop" exact component={Desktop} />
        <Route path="/monitor" exact component={Monitor} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/user/dashboard" exact component={UserDashboard} />
        <Route path="/admin/dashboard" exact component={AdminDashboard} />
        <Route path="/create/category" exact component={AddCategory} />
        <Route path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
