import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminStyle/ProductDetails.css';

const ProductDetails = () => {
    const navigate=useNavigate()
  const [product, setProduct] = useState(null);
  const { id } = useParams(); 
  useEffect(() => {
    axios
      .get
      (`http://localhost:5000/Product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product details!", error);
      });
  }, [id]);


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/Product/${id}`)
        .then(() => {
          alert("Product deleted successfully!");
          navigate("/product");
        })
        .catch((error) => {
          console.error("Error deleting product!", error);
        });
    }
  };

  const handleEdit=()=>{
    navigate(`/product/edit/${id}`)
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="products-details">
      <img src={product.image} alt={product.name} className="products-image" />
      <div className="product-info">
        <h1 className='products-name'>{product.name}</h1>
        <p className="products-type">Category: {product.category}</p>
        <p className="products-price">Price: ${product.price.toFixed(2)}</p>
        <p className="products-rating">Rating: {product.stars} </p>

        <div className="products-actions">
            <button className="edits-button" onClick={handleEdit}>Edit</button>
            <button className="deletes-button" onClick={handleDelete}>Delete</button>
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;
