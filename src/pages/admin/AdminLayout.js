import React from "react";
import { Link, useNavigate,Outlet, } from "react-router-dom";
// import "./AdminSidebar.css";

function AdminLayout() {
    const navigate = useNavigate();
    const handleLogout = () => {
         localStorage.clear();
        sessionStorage.clear();

    // Redirect to login
        navigate("/login");
        
    }
  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="admin-sidebar" style={{ width: "220px", background: "#343a40", color: "#fff", padding: "20px", }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="list-unstyled">
          <li><Link to="/admin" className="text-white" style={{textDecoration:"none"}} > Dashboard</Link></li>
          <li><Link to="/admin/products" className="text-white"style={{textDecoration:"none"}}> Products</Link></li>
          <li><Link to="/admin/categories" className="text-white" style={{textDecoration:"none"}}> Categories</Link></li>
          <li><Link to="/admin/offers" className="text-white" style={{textDecoration:"none"}}> Offers</Link></li>
          <li><Link to="/admin/orders" className="text-white" style={{textDecoration:"none"}}> Orders</Link></li>
          <li>
            <button 
              onClick={handleLogout} 
              style={{ 
                marginTop: "20px", 
                background: "#dc3545", 
                color: "#fff", 
                border: "none", 
                padding: "10px", 
                cursor: "pointer",
                width: "100%",
                borderRadius: "4px"
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-content" style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
