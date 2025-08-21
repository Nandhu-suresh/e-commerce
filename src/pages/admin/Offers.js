import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({ title: "", discount: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  //  Fetch offers
  useEffect(() => {
    axios.get("http://localhost:5000/offers").then(res => setOffers(res.data));
  }, []);

  //  Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Add / Update offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/offers/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/offers", form);
    }
    setForm({ title: "", discount: "", description: "", image: "" });
    setEditingId(null);
    axios.get("http://localhost:5000/offers").then(res => setOffers(res.data));
  };

  //  Edit offer
  const handleEdit = (offer) => {
    setForm(offer);
    setEditingId(offer.id);
  };

  //  Delete offer
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/offers/${id}`);
    setOffers(offers.filter(o => o.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Offers</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="discount"
          placeholder="Discount (e.g. 20%)"
          value={form.discount}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-success">
          {editingId ? "Update Offer" : "Add Offer"}
        </button>
      </form>

      {/* Offers List */}
      <div className="row">
        {offers.map((offer) => (
          <div key={offer.id} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">
                  <strong>{offer.discount}</strong>
                </p>
                <p className="card-text">{offer.description}</p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(offer)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(offer.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOffers;
