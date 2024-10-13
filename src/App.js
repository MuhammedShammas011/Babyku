import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/nav/Navbar";
import Login from "./Pages/LogIn";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import { CartProvider } from "./Pages/cartContext";
import Shop from "./Pages/Shop";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import ScrollTop from "./Pages/ScrollTop";
import Payment from "./Pages/Payment";
import About from "./Pages/About";
import SingleView from "./Pages/SingleView";
import AdminDashboard from "./Admin/AdminDashboard";
import Products from "./Admin/Products";
import AdminLayout from "./Admin/AdminLayout";
import ProductAdd from "./Admin/ProductAdd";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./Admin/ProductDetails";
import ProductEdit from "./Admin/ProductEdit";
import User from "./Admin/User";
import UserDetails from "./Admin/UserDetails";
import Dashboard from "./Admin/DashBoard";

const AppRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the logged-in user is an admin
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  return (
    <>
      {/* Hide Navbar if the user is an admin or on the Admin Dashboard */}
      {!isAdmin && location.pathname !== "/admindashboard" && <Navbar />}
      <ScrollTop />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />
        <Route path="/single/:productId" element={<SingleView />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/product"
          element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          }
        />
        <Route
          path="/addproduct"
          element={
            <AdminLayout>
              <ProductAdd />
            </AdminLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AdminLayout>
              <ProductDetails />
            </AdminLayout>
          }
        />

        <Route
          path="/product/edit/:id"
          element={
            <AdminLayout>
              <ProductEdit />
            </AdminLayout>
          }
        />

        <Route
          path="/user"
          element={
            <AdminLayout>
              <User />
            </AdminLayout>
          }
        />

        <Route
          path="/userdetails/:id" // Make sure to add the :id here
          element={
            <AdminLayout>
              <UserDetails />
            </AdminLayout>
          }
        />
             <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
