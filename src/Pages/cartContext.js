
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

 
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];
      if (!updatedCart.find((item) => item.id === product.id)) {
        updatedCart.push(product);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart ,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
