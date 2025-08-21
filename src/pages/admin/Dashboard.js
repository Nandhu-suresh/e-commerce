// src/pages/admin/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        {/* <div className="col-md-3 bg-dark text-white vh-100 p-4">
          <h3>Admin Panel</h3>
          <ul className="list-unstyled mt-4">
            <li><Link to="/admin/products" className="text-white">Manage Products</Link></li>
            <li><Link to="/admin/categories" className="text-white">Manage Categories</Link></li>
            <li><Link to="/admin/offers" className="text-white">Manage Offers</Link></li>
            <li><Link to="/admin/orders" className="text-white">Manage Orders</Link></li>
          </ul>
        </div> */}

        {/* Main Content */}
        <div className="col-md-9 p-4">
          <h2>Welcome, Admin </h2>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
