import React from "react";
import NaviBar from "../navi/NaviBar"
import Dashboard from "./Dashboard";
import{Container} from "reactstrap"
import Footer from "./Footer";
import {Route, Switch} from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import NotFound from "../common/NotFound";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import AddOrUpdateCategory from "../categories/AddOrUpdateCategory";
import AddOrUpdateCart from "../cart/AddOrUpdateCart";
import AdminEdit from "../edit/AdminEdit";
import LoginUser from "../common/LoginUser";
import { getSessionUser } from "../../redux/actions/loginActions";
import AboutUs from "./AboutUs";
import ProductDetailView from "../products/ProductDetailView";

/** @author: istiklal */

function App() {
  const user = getSessionUser();
  return (
    <Container fluid="fluid" id="AppContainer">
      <NaviBar user={user} />
      <br />
      <hr />
      <br />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/product" exact component={Dashboard} />
        <Route path="/product/:productId" component={ProductDetailView} />
        <Route path="/cart" exact component={CartDetail} />
        <Route path="/savecart" exact component={AddOrUpdateCart} />
        <Route path="/admin/saveproduct/:productId" component={AddOrUpdateProduct} />
        {/* <Route path="/admin/saveproduct/" component={AddOrUpdateProduct} /> */}
        <Route path="/admin/savecategory/:categoryId" component={AddOrUpdateCategory} />
        <Route path="/admin/savecart/:cartId" component={AddOrUpdateCart} />
        {/* <Route path="/admin/upload/" component={SimpleReactFileUpload} /> */}
        <Route path="/admin/edit/" exact component={AdminEdit} />
        <Route path="/admin/" exact component={LoginUser} />
        <Route path="/about_us/" exact component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
      <br />
      <br />
      <Footer />
    </Container>
  );
}

export default App;
