import React, { useState, useEffect } from 'react';
import './pageStyle/Cart.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      const cartData=(JSON.parse(savedCart).map(item=>({
        ...item,
        quantity:item.quantity || 1,
      })));
      setCartItems(cartData)
    }
  }, []);
  
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 1;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };


  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    setNotification("Product Removed from Cart");
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [id]: size,
    }));
  };
const increaseQuantity = (id) => {
  const updatedCart = cartItems.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  setCartItems(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

const decreaseQuantity = (id) => {
  const updatedCart = cartItems.map((item) =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  setCartItems(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};


  return (
    <div className="cart-container">
      <h2 className="section-title">Your Cart</h2>

      {notification && <div className="notification" style={{ backgroundColor: 'red', color: 'white', padding: '5px', textAlign: 'center', width: '250px', margin: '0 auto', position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>{notification}</div>}

      {cartItems.length === 0 ? (
        <h2 className="section-title-empty">Your cart is empty</h2>
      ) : (
        <>
          <div className="cart-header">
            <h4>Items</h4>
            <h4>Price</h4>
            <h4>Qty</h4>
            <h4>Total Price</h4>
          </div>
          <ul className="cart-items2">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item2">
                <div className="cart-item-section">
                  <img src={item.image} alt={item.name} className="cart-item-image2" />
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.name}</h5>
                    {item.category === "Clothing" && (
                      <div className="size-selector">
                        <label htmlFor={`size-${item.id}`}>Size: 
                        <select
                          id={`size-${item.id}`}
                          value={selectedSizes[item.id] || ""}
                          onChange={(e) => handleSizeChange(item.id, e.target.value)}
                        >
                          <option value="">Size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select></label>
                      </div>
                    )}
                  </div>
                </div>
                <p className="cart-item-price"><b>${item.price}</b></p>
                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
                <p className="cart-item-total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <i class="fa-regular fa-circle-xmark"  onClick={() => handleRemoveItem(item.id)} ></i>
              </li>
            ))}
          </ul>
          <div className="cart-grand-total">
            <h3>Grand Total: ${calculateTotalPrice().toFixed(2)}</h3>
          </div>
          <button className="checkout">
            <Link to="/payment" style={{ textDecoration: 'none', color: 'white' }}>
              Proceed to Checkout <b>&#10140;</b>
            </Link>
          </button>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
