
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import aynu from '../Components/assets/aynu.jpg';
import { CartContext } from './cartContext';
import Footer from './Footer';

const Shop = () => {
  const { addToCart, cartItems } = useContext(CartContext); 

  const [clothingProducts, setClothingProducts] = useState([]);
  const [toysProducts, setToysProducts] = useState([]);
  const [proteinProducts, setProteinProducts] = useState([]);

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/Product")
      .then((response) => {
        const products = response.data;

        
        const clothingItems = products.filter(
          (product) => product.category === "Clothing"
        );
        const toysItems = products.filter(
          (product) => product.category === "Toys"
        );
        const proteinItems = products.filter(
          (product) => product.category === "Protein"
        );

   
        setClothingProducts(clothingItems);
        setToysProducts(toysItems);
        setProteinProducts(proteinItems);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <div>
    
      <h2 className="section-title">Clothing & Fashion</h2>
      <div className="product-grid">
        {clothingProducts.map((product) => (
          <div key={product.id} className="product-card">
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
                onClick={() => addToCart(product)}
              >
                {cartItems.find((item) => item.id === product.id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <h2 className="section-title">Toys</h2>
      <div className="product-grid">
        {toysProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-imag" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">Rating: {product.stars} ★</p>
            <div>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                {cartItems.find((item) => item.id === product.id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <h2 className="section-title">Protein & Baby Needs</h2>
      <div className="product-grid">
        {proteinProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-imag" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">Rating: {product.stars} ★</p>
            <div>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                {cartItems.find((item) => item.id === product.id)
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
