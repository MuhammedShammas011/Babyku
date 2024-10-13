import './pageStyle/Shop.css';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import aynu from '../Components/assets/aynu.jpg';
import { CartContext } from './cartContext'; // Import the CartContext
import Footer from './Footer';
import Filter from './Filter'; // Import the Filter component
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Shop = () => {
  // Get cart context methods and state
  const { addToCart, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem('selectedCategory') || ''
  );
  const productsPerPage = 9;

  useEffect(() => {
    axios
      .get("http://localhost:5000/Product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Notification for cart addition
  const notifycart = () => {
    toast.success('Product added to Cart', {
      position: "top-center",
      autoClose: 3000, // Longer timeout for better visibility
      hideProgressBar: false,
      closeOnClick: true, // Allows closing with cross button
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: "Slide",
      style: { whiteSpace: "nowrap" },
    });
  };

  // Function to add to cart and show notification
  const handleAddToCart = (product) => {
    addToCart(product); // Use the context method to add the product to cart
    notifycart();
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilter = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
    setIsFilterOpen(false);
  };

  return (
    <div className='shop-container'>
      <div className="shop-heading">
        <h2>{selectedCategory ? selectedCategory : 'Our Products'}</h2>
      </div>
      <p className="shop-showing">
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
      </p>

      <div onClick={toggleFilterSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512 " className='filter-icon'>
          <path d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </div>
      <p className="filter-text">Filter</p>

      <Filter isOpen={isFilterOpen} toggleFilterSidebar={toggleFilterSidebar} applyFilter={applyFilter} />

      <div className="product-grid-shop">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/single/${product.id}`}>
              <i className="fa-solid fa-magnifying-glass-plus magnifying-icon"></i>
            </Link>
            <img
              src={product.id === "13" ? aynu : product.image}
              alt={product.name}
              className="product-imag"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">Rating: {product.stars} ★</p>
            <div>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)} // Use the addToCart function from context
              >
                {cartItems.find((item) => item.id === product.id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button
          className={`pagination-btn ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        <button
          className={`pagination-btn ${currentPage === 3 ? 'active' : ''}`}
          onClick={() => handlePageChange(3)}
        >
          3
        </button>
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
        >
          →
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
