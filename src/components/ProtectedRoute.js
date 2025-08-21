// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  // 👆 assuming you store { role: "admin", name: "..." } in localStorage after login

  if (!user) {
    return <Navigate to="/" replace />; // not logged in → go to login
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/home" replace />; // not admin → go to home
  }

  return children; // ✅ allowed
};

export default ProtectedRoute;
