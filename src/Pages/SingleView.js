import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import "./pageStyle/SingleView.css"; 

const SingleView = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const navigate = useNavigate();
  const fetchRelatedProducts = useCallback((category) => {
    // Fetch products from the same category
    axios
      .get(`http://localhost:5000/Product?category=${category}`)
      .then((response) => {
        // Filter out the current product from related products
        const related = response.data.filter((item) => item.id !== productId);
        setRelatedProducts(related.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching related products:", error));
  }, [productId]); // Include productId as a dependency if it's used in the function

  useEffect(() => {
    // Fetch the product data using the product ID
    axios
      .get(`http://localhost:5000/Product/${productId}`)
      .then((response) => {
        setProduct(response.data); // Set the product data
        fetchRelatedProducts(response.data.category); // Fetch related products based on category
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [productId, fetchRelatedProducts]); // Include fetchRelatedProducts in the dependencies

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      // If it is, increase the quantity or do nothing (or update the quantity)
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...existingProduct, quantity: existingProduct.quantity + 1 } : item
      ));
    } else {
      // If not, add the product to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    console.log('Cart Items:', cartItems); // Debugging log to check cart items
  };

  if (!product) {
    return <div>Loading...</div>; // Show a loading state while fetching the product
  }
  const handleBuyNow = (product) => {
    // Redirect to the payment page with the product data
    navigate('/payment', { state: { productToBuy: product } });
  };
  

  return (
    <div className="singleProduct-container">
      <div className="singleProduct-details">
        <img src={product.image} alt={product.name} className="singleProduct-image" />
        <div className="singleProduct-info">
          <h2 className="singleProduct-name">{product.name}</h2>
          <p className="singleProduct-price">${product.price}</p>
          <p className="singleProduct-description">{product.description}</p>
          <p className="singleProduct-rating">Rating: {product.stars} ★</p>
          <button className="single-buy" onClick={() => handleBuyNow(product)}>Buy Now</button>

        </div>
      </div>

      {/* Related Products Section */}
      <div className="relatedProducts-section">
        <h2 className="relatedProducts-heading">Related Products</h2>
        <div className="relatedProducts-grid">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="relatedProduct-card">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="relatedProduct-image" />
              <h3 className="relatedProduct-name">{relatedProduct.name}</h3>
              <p className="relatedProduct-price">${relatedProduct.price}</p>
              <p className="relatedProduct-rating">Rating: {relatedProduct.stars} ★</p>
              <Link to='/cart'> 
              <button className="add-to-cart-button" onClick={() => handleAddToCart(relatedProduct)}>
              Add to Cart
              </button> </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleView;
