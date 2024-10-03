import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
            className="logo"
            alt="Logo"
          />
        </Link>
      </div>


      <div className="hamburger-menu" onClick={toggleMenu}>
        <i className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>


      <ul className={`nav-items ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/testimonial"
            style={{ textDecoration: "none", color: "black" }}
          >
            Testimonial
          </Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="search-box">
       
        <input type="text" placeholder="Search Product..." />
        <Link to='/shop'>  
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </Link>
      </div>

      <div className="nav-icons">
        <Link to="/cart">
          <i className="fa-solid fa-cart-shopping cart-icon"></i>
        </Link>

        <Link to="/login">
          <i className="fa-solid fa-user user-icon"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
