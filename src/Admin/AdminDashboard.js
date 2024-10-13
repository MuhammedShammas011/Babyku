import React from "react";
import { Link } from "react-router-dom";
import "./AdminStyle/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-container">
        <img
          src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
          alt="logo"
          className="admin-logo"
        />
        <div>
          <ul className="admin-menu">
            <li className="admin-menu-item">
            <Link to="/dashboard">
              <i className="fa-solid fa-table-columns admin-icon"></i>
              <h3 className="admin-menu-text">Dashboard</h3>
              </Link>
            </li>
            <li className="admin-menu-item">
              <Link to="/product">
                <i className="fa-solid fa-cart-shopping admin-icon"></i>
                <h3 className="admin-menu-text">Products</h3>
              </Link>
            </li>

            <li className="admin-menu-item">
              <Link to="/user">
                <i className="fa-solid fa-user admin-icon"></i>
                <h3 className="admin-menu-text">Users</h3>
              </Link>
            </li>
            <li className="admin-menu-item">
              <Link to="/login">
                <i className="fa-solid fa-right-from-bracket admin-icon"></i>
                <h3 className="admin-menu-text">Logout</h3>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
