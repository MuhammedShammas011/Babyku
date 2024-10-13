import React, { useState, useEffect } from "react";
import "./AdminStyle/Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/Product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter(
    (product) => filter === "All" || product.category === filter
  );
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-container">
      <h2 className="product-head">PRODUCTS</h2>
      <p className="managing">Manage products here</p>
      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Clothing" ? "active" : ""}
          onClick={() => setFilter("Clothing")}
        >
          Clothing
        </button>
        <button
          className={filter === "Toys" ? "active" : ""}
          onClick={() => setFilter("Toys")}
        >
          Toys
        </button>
        <button
          className={filter === "Protein" ? "active" : ""}
          onClick={() => setFilter("Protein")}
        >
          Proteins
        </button>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>

                <td>{product.stars}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleView(product.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="product-adding"
        onClick={() => navigate("/addproduct")}
      >
        Add New Product
      </button>
    </div>
  );
};

export default Products;
