import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders").then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`http://localhost:5000/orders/${id}`, { status });
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="container mt-4">
      <h2>Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.customer.name} <br />
                  {order.customer.email} <br />
                  {order.customer.address}
                </td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} - ₹{item.price}
                    </div>
                  ))}
                </td>
                <td>{order.status}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(order.id, "Approved")}>
                    Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => updateStatus(order.id, "Rejected")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
