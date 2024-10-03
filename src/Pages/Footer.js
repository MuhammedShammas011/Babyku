import React from "react";
import "./pageStyle/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
            <Link to='/'> 
        <img
            src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
            className="logo"
            alt="Logo"
          />
          </Link>
          <p>123 Fifth Ave, New York, NY 12004.</p>
          <p>+91 9037251498</p>
          <p>iambabyku.com</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
            <a href="https://x.com/?lang=en"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/shammuuuu_/"><i className="fab fa-instagram"></i></a>
            <a href="#\https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to='/'>Contact Us</Link></li>
            <li><Link to='/'>Help & FAQs</Link></li>
            <li><Link to='/'>Payment Method</Link></li>
            <li><Link to='/'>Delivery Information</Link></li>
            <li><Link to='/'>Track Your Order</Link></li>
            <li><Link to='/'>Return & Exchanges</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li><Link to='/shop'>Clothing & Fashion</Link></li>
            <li><Link to='/shop'>Toys</Link></li>
            <li><Link to='/shop'>School Supplies</Link></li>
            <li><Link to='/shop'>Birthday Party Supplies</Link></li>
            <li><Link to='/shop'>Baby Diapering</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Our Company</h3>
          <ul>
            <li><a href="https://www.google.co.in/">Corporate Information</a></li>
            <li><a href="https://www.google.co.in/">Privacy & Cookies Policy</a></li>
            <li><a href="https://www.google.co.in/">Terms & Condition</a></li>
            <li><a href="https://www.google.co.in/">Promo & Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 Baby Store | Powered by Baby Store</p>
      </div>
    </footer>
  );
};

export default Footer;


