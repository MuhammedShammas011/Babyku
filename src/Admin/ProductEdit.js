import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminStyle/ProductAdd.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductEdit = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stars: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Product/${id}`)
      .then((response) => {
        setNewProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the product details!", error);
      });
  }, [id]);

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
      .put(`http://localhost:5000/Product/${id}`, newProduct)
      .then(() => {
        
        navigate("/product");
      })
      .catch((error) => {
        console.error("Error adding product!", error);
      });
  };
  const notifyedit=()=> {
    toast.success('Product Updated', {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true, 
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: "Slide",
      style: { whiteSpace: "nowrap" },
    });
  }

  return (
    <div className="add-product">
      <h2 className="add-product-title">Update Product</h2>
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
        <button type="submit" className="submit-btn" onClick={notifyedit}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
