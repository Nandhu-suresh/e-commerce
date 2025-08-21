import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  // recalc total
  const calculateTotal = (cart) => {
    const cartTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  };

  // remove item from cart
  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    calculateTotal(updatedCart);
  };

  // increase quantity
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // decrease quantity
  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Price: ₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleDecrease(index)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => handleIncrease(index)}
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-2">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Cart Summary</h5>
              <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <h4>Total: ₹{total}</h4>
              {cartItems.length > 0 && (
                <Link to="/checkout" className="btn btn-primary w-100 mt-3">
                  Proceed to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
