import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Navbar from "./components/Navbar";

// Import pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/admin/Dashboard";
import Adminproducts from "./pages/admin/Adminproducts";
import Categories from "./pages/admin/Categories";
import AdminOffers from "./pages/admin/Offers";
import Orders from "./pages/admin/Orders";
import Products from "./pages/Products";
import AdminLayout from "./pages/admin/AdminLayout"; 

// 404 Page
function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <a href="/home" className="btn btn-primary">Go to Home</a>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/" || location.pathname === "/login"; 

  return (
    <>
      {(!isAdminRoute && !isLoginRoute) && <Navbar />}
      
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> 

        {/* Customer Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products />} />

        {/* Admin Routes with Sidebar Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Adminproducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="orders" element={<Orders />} />
        </Route>

       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
