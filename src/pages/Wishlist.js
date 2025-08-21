import React, { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    let updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mt-5">
      <h2>My Wishlist</h2>
      <div className="row mt-4">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p>₹{product.price}</p>
                  <p className="text-muted">{product.category}</p>
                  <div className="mt-3">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
