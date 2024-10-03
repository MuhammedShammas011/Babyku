import React, { useContext, useState } from 'react';
import { CartContext } from './cartContext';
import './pageStyle/Payment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faCreditCard, faTag } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const { cartItems, clearCart } = useContext(CartContext); 
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
  const [shippingInfo, setShippingInfo] = useState({ address: '', city: '', zip: '' });
  const [billingInfo, setBillingInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [promoCode, setPromoCode] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const totalAmount = cartItems?.reduce((total, item) => total + item.price, 0) || 0;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsSuccessful(true);
    clearCart();
    alert('Payment successful!');
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">No items in your cart to checkout!</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Your Order:</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.type} className="product-image" />
                <div className="item-details">
                  <h4>{item.type}</h4>
                  <p className="item-price">Price: ${item.price}</p>
                </div>
              </div>
            ))}
            <h3 className="total-amount">Total Amount: ${totalAmount}</h3>
          </div>
          <form className="payment-form" onSubmit={handlePayment}>
            <h3>
              <FontAwesomeIcon icon={faUser} /> Customer Information
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              required
            />
            <h3>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Shipping Information
            </h3>
            <input
              type="text"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={shippingInfo.zip}
              onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
              required
            />
            <h3>
              <FontAwesomeIcon icon={faCreditCard} /> Billing Information
            </h3>
            <input
              type="text"
              placeholder="Card Number"
              value={billingInfo.cardNumber}
              onChange={(e) => setBillingInfo({ ...billingInfo, cardNumber: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={billingInfo.expiry}
              onChange={(e) => setBillingInfo({ ...billingInfo, expiry: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={billingInfo.cvv}
              onChange={(e) => setBillingInfo({ ...billingInfo, cvv: e.target.value })}
              required
            />
            <h3>
              <FontAwesomeIcon icon={faTag} /> Promotional Codes / Discounts
            </h3>
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button type="submit" className="cta-button">Pay Now</button>
          </form>
          {isSuccessful && <p className="success-message">Your payment has been processed successfully!</p>}
        </>
      )}
    </div>
  );
};

export default Payment;
