import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category:"", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  //  Fetch products
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
  }, []);

  //  Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/products/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/products", form);
    }
    setForm({ name: "", price: "", category:"", description: "", image: "" });
    setEditingId(null);
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
  };

  // Edit product
  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  //  Delete product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products List */}
      <ul className="list-group">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{product.name}</strong> - ₹{product.price} <br />
              <small>{product.description}</small>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;
