import React, { useState } from 'react';
import './pageStyle/Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="contact-container">
     <div className="contact-left">
      <h2 className="testimonial-heading">Stay in Touch</h2>
        <div className="contact-info">
          <div className="contact-info-item">
            <i className="fas fa-building" 
               style={{color:"orangered"}}></i>
            <div>
              <h3 style={{color:"orangered"}}>Head Office</h3>
              <p>123 Fifth Ave, New York, NY 12004, US.</p>
            </div>
          </div>

          <div className="contact-info-item">
            <i className="fas fa-phone-alt" style={{color:"orangered"}}></i>
            <div>
              <h3 style={{color:"orangered"}}>Call Us</h3>
              <p>+1 123 456 7890</p>
            </div>
          </div>

          <div className="contact-info-item">
            <i className="fas fa-envelope" style={{color:"orangered"}}></i>
            <div>
              <h3 style={{color:"orangered"}}>Email Us</h3>
              <p>iambabyky.com</p>
              <p>clothingbabyku.com</p>
            </div>
          </div>
        </div>

        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509413!2d144.95373631531595!3d-37.816279279751566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773e1c0d0b4d0!2s123%20Fifth%20Ave%2C%20Melbourne%20VIC%203001%2C%20Australia!5e0!3m2!1sen!2sus!4v1604645335552!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="contact-right">
        <div className="form-image-wrapper">
    
          <div className="image-container">
            <img 
              src="https://cdn.firstcry.com/education/2023/09/15090729/244773607.jpg" 
              alt="Dummy Contact Illustration" 
              className="contact-dummy-image"
            />
            <div className="image-text">
              <h2>Send Us A Message</h2>
              <p className="dummy-message">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>
          </div>

          
          <div className="form-content">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name <span>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <p className="error-message">This field is required.</p>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email <span>*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <p className="error-message">This field is required.</p>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject <span>*</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <p className="error-message">This field is required.</p>
              </div>
              <div className="form-group">
                <label htmlFor="message">Comment or Message <span>*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <p className="error-message">This field is required.</p>
              </div>
              <button type="submit" className="send-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
