// AdminLayout.js
import React from "react";
import AdminDashboard from "./AdminDashboard";  
import './AdminStyle/AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar"> 
        <AdminDashboard /> 
      </div>
      <div className="admin-content"> 
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
