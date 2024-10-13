import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);

  const navigate = useNavigate(); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/Product"); 
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      const filteredSuggestions = products.filter(
        (product) => product.name.toLowerCase().includes(value.toLowerCase()) 
      );
      setSuggestions(filteredSuggestions);
      setIsSuggestionVisible(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsSuggestionVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput("");
    setSuggestions([]);
    setIsSuggestionVisible(false);

    navigate(`/single/${suggestion.id}`);
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
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black" }}
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Product..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <Link to="/shop">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </Link>
        {isSuggestionVisible && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name} 
              </div>
            ))}
          </div>
        )}
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
