
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod", // default = cash on delivery
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create order object
    const newOrder = {
      customer: formData,
      items: cart,
      status: "Pending",
      date: new Date().toISOString(),
    };

    try {
      
      await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      // Clear cart
      localStorage.removeItem("cart");

      // Mock success
      setSuccess(true);

      // Redirect to home 
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {success ? (
        <div className="alert alert-success mt-4">
          Order placed successfully! Redirecting to home...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* payment */}
          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <div>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === "cod"}
                onChange={handleChange}
              />{" "}
              Cash on Delivery
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.payment === "card"}
                onChange={handleChange}
              />{" "}
              Credit/Debit Card
            </div>
          </div>

          {formData.payment === "card" && (
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-success">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
