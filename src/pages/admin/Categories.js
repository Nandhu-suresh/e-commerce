// src/pages/admin/AdminCategories.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });

  // Fetch Categories
  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add Category
  const handleAddCategory = () => {
    axios.post("http://localhost:5000/categories", newCategory)
      .then((res) => {
        setCategories([...categories, res.data]);
        setNewCategory({ name: "" });
      })
      .catch((err) => console.error(err));
  };

  // Delete Category
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/categories/${id}`)
      .then(() => setCategories(categories.filter((c) => c.id !== id)))
      .catch((err) => console.error(err));
  };

  // Update Category
  const handleUpdate = (id, updatedCategory) => {
    axios.put(`http://localhost:5000/categories/${id}`, updatedCategory)
      .then((res) => {
        setCategories(categories.map((c) => (c.id === id ? res.data : c)));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Categories</h2>

      {/* Add Category Form */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Category Name"
          className="form-control mb-2"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {/* List Categories */}
      <ul className="list-group">
        {categories.map((c) => (
          <li key={c.id} className="list-group-item d-flex justify-content-between">
            <span>{c.name}</span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleUpdate(c.id, { ...c, name: c.name + " Updated" })}
              >
                Update
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCategories;
