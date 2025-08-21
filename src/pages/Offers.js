import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";

function Offers() {
  const [offers, setOffers] = useState([]);

   
  useEffect(() => {
    axios.get("http://localhost:5000/offers").then((res) => setOffers(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Latest Offers</h2>

      {offers.length === 0 ? (
        <p className="text-center text-muted">No offers available at the moment</p>
      ) : (
        <div className="row">
          {offers.map((offer) => (
            <div key={offer.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{offer.title}</h5>
                  <p className="card-text">
                    <strong>{offer.discount}</strong>
                  </p>
                  <p className="card-text">{offer.description}</p>
                  <button className="btn btn-success btn-sm">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Offers;
