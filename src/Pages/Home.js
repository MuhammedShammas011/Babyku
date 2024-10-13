import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./pageStyle/Home.css";
import { CartContext } from "./cartContext"; 
import background_img from '../Components/assets/background_img.png';
import { Link, useNavigate } from "react-router-dom";
import Formal from "./Formal";
import Footer from "./Footer";


const Home = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [notification, setNotification] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/Product")
      .then((response) => {
        const Products = response.data;
        const bestSellers = Products.filter((Product) => Product.stars >= 4.4);
        setBestSellingProducts(bestSellers);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      addToCart(product); 
      setNotification("Product added to cart");

    
      setTimeout(() => {
        setNotification("");
      }, 2000);
    } else {
    
      alert("Please log in to add products to the cart.");
      navigate("/login"); 
    }
  };

  const testimonials = [
    {
      quote: "This is the best baby store I’ve ever come across. The products are top quality, and the service is outstanding!",
      name: "Sarah Johnson",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg" 
    },
    {
        id:4,
      quote: "Their collection of baby clothes is unmatched! I’ve never seen such cute and high-quality outfits.",
      name: "Amanda Roberts",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/72.jpg"
    },
  ];

  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star star-filled"></i>);
      } else {
        stars.push(<i key={i} className="fas fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <>
      {notification && (
        <div className="notification" style={{ backgroundColor: 'green', color: 'white', padding: '5px', textAlign: 'center', width: '250px', margin: '0 auto', position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          {notification}
        </div>
      )}

      <div>
        <img src={background_img} alt="backimg" className="back-img" />
      </div>
      <div className="best-selling-section" >
        <h2 className="section-title">Best sellers</h2>
        <div className="product-grid">
  {bestSellingProducts.map((Product) => (
    <div key={Product.id} className="product-card">
      <img src={Product.image} alt={Product.name} className="product-imag" />
      <h3 className="product-name">{Product.name}</h3>
      <p className="product-price">${Product.price}</p>
      <p className="product-rating">Rating: {Product.stars} ★</p>
      <div> 
        <button
          className="add-to-cart-button"
          onClick={() => handleAddToCart(Product)}
        >
          {cartItems.find((item) => item.id === Product.id) ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  ))}
</div>

      </div>

      <section className="testimonial-section">
        <h2 className="testimonial-heading">Why They Love Us</h2>
        <h6><Link to='/testimonial' className="testimonial-home">view All Testimonials<span>&#8594;</span> </Link></h6>
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonial.img} alt={testimonial.name} className="testimonial-image" />
              <div className="testimonial-stars">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-quote">“{testimonial.quote}”</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
            </div>
          ))}
        </div>
        <Formal />
        <Footer />
      </section>
    </>
  );
};

export default Home;
