// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/nav/Navbar";
import Login from "./Pages/LogIn";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import  Cart  from "./Pages/Cart";
import { CartProvider } from "./Pages/cartContext"; 
import Shop from "./Pages/Shop";
import Testimonial from "./Pages/Testimonial";
import Contact from "./Pages/Contact";
import ScrollTop from "./Pages/ScrollTop";
import Payment from "./Pages/Payment";
import About from "./Pages/About";
function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Navbar />
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/testimonial' element={<Testimonial/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;




