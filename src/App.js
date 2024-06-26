import logo from './logo.svg';
import './App.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "./features/product/productApi";
import ProductList from "./features/product/ProductList";
import ProductDetails from './features/product/ProductDetails';
// import ButtonBaseDemo from "./features/LinksProduct"
import LabelBottomNavigation from "./Footer"
import { saveOrderInClient } from "./features/order/orderSlice";
import { getAllOrder } from "./features/order/orderApi";
import { userIn } from "./features/user/userSlice";
import { addToBasket } from "./features/order/orderSlice"
import { Login } from "./features/user/LoginNew"
import { SignUp } from './features/user/SignUp';
import { AddProductAdmin } from './features/product/FormAddProduct';
import { Basket } from "./features/order/OrderBasket";
import FormDialog from "./features/order/FinishOrder"
import SmallBasket from "./features/order/SmallBasket"
// import SwipeableTextMobileStepper from './Header';
import Footer from './Footer';
import Navbar from './Navbar';


import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Create a higher-order component to handle private routes
// const PrivateRoute = ({ element, ...rest }) => {
//   const currentUser = useSelector((state) => state.user.currentUser);

//   return currentUser ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

const PrivateRoute = ({ element, ...rest }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return currentUser ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="login" replace />
  );
};
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u) {
      dispatch(userIn(JSON.parse(u)));
    }
  },
    []);
  //   let b = localStorage.getItem("basket");
  //   if (b) {
    // let basket = JSON.parse(b);
  //     dispatch(addToBasket(JSON.parse(b)));
  //   }

  return (

    <div>
      {/* <ResponsiveAppBar/> */}
      {/* <AddProductAdmin/> */}
      {/* <ButtonBaseDemo/> */}
      {/* <FixedBottomNavigation/> */}
      <Navbar />
      {/* <Routes>
      <Route path='addProduct' element={<PrivateRoute><AddProductAdmin/></PrivateRoute>}/>  </Routes> */}
      <Routes>
        <>
        {/* <Route path='/'element={<ResponsiveAppBar/>}/> */}
        <Route path='/' element={<ProductList />} />
        <Route path='details' element={<ProductDetails />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<SignUp />} />
        <Route path='addProduct' element={<AddProductAdmin />} />
        {/* <PrivateRoute path="/addProduct" element={<AddProductAdmin />} /> */}
        <Route path='finish' element={<FormDialog />} />
        <Route path='basket' element={<Basket />} />
        <Route path='smallBasket' element={<SmallBasket />} />

        {/* <Route path='home' element={<SwipeableTextMobileStepper/>}/> */}
        </>
      </Routes>
      <Footer/>
      {/* <LabelBottomNavigation/> */}
      {/* <ButtonBaseDemo/> */}
    </div>

  );
}

export default App;
