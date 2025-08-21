import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css"; 

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h3 className="p-3">Admin Panel</h3>
      <ul className="list-unstyled px-3">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/offers">Offers</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
