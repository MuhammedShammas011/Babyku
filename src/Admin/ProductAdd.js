import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AdminStyle/ProductAdd.css'

const ProductAdd = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stars: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "stars" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/Product", newProduct)
      .then(() => {
        alert("Product added successfully!");
        navigate("/product");
      })
      .catch((error) => {
        console.error("Error adding product!", error);
      });
  };

  return (
    <div className="add-product">
      <h2 className="add-product-title">Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="product-name-input"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="product-description-input"
        />
        
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="product-category-input"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="product-price-input"
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="product-image-input"
        />
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
