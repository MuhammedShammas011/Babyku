import React from 'react';
import './pageStyle/Testimonial.css';
import Footer from './Footer';
import Formal from './Formal';

const Testimonial = () => {
  const mainTestimonial = {
    quote: "BabyKu changed the way I shop for my baby. The quality, variety, and service are unmatched. Highly recommended.BabyKu has transformed my shopping experience! Every product I’ve purchased has exceeded my expectations, and the customer support is phenomenal!",
    name: "Alexandra Smith",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/32.jpg" 
  };

  const subTestimonials = [
    {
        id:1,
      quote: "This is the best baby store I’ve ever come across. The products are top quality, and the service is outstanding!",
      name: "Sarah Johnson",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        
        id:2,
      quote: "Amazing variety and super fast delivery! I found everything I needed for my little one in one place.",
      name: "Emily Davis",
      rating: 4,
      img: "https://randomuser.me/api/portraits/women/50.jpg" 
    },
    {
        
        id:3,
      quote: "I love the selection and the customer service is excellent. I always recommend this store to my friends!",
      name: "Jessica Lee",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/68.jpg" 
    },
    {
        id:4,
      quote: "Their collection of baby clothes is unmatched! I’ve never seen such cute and high-quality outfits.",
      name: "Amanda Roberts",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    {
        id:5,
      quote: "Customer service was very helpful and made sure I got my order on time. Highly recommended!",
      name: "Michael Carter",
      rating: 4,
      img: "https://randomuser.me/api/portraits/men/22.jpg" 
    },
    {
        id:6,
      quote: "I always find the most unique and practical baby products here. Their prices are unbeatable too!",
      name: "Sophia Williams",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/19.jpg"
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
    <section className="testimonial-section">
      <h2 className="testimonial-heading">Why They Love Us</h2>

     
      <div className="main-testimonial-card">
        <img src={mainTestimonial.img} alt={mainTestimonial.name} className="testimonial-image-large" />
        <div className="testimonial-stars">
          {renderStars(mainTestimonial.rating)}
        </div>
        <p className="testimonial-quote-large">“{mainTestimonial.quote}”</p>
        <h3 className="testimonial-name-large">{mainTestimonial.name}</h3>
      </div>

    
      <div className="testimonial-container">
        {subTestimonials.map((testimonial, index) => (
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
  );
};

export default Testimonial;
