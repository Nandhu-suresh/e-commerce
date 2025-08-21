import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container mt-4">
      
      
      <div id="homeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
  </div>

  <div className="carousel-inner rounded shadow">
    <div className="carousel-item active">
      <img
        src="https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/aa3b4d169d270bc7.jpg?q=60"
        className="d-block w-100"
        alt="Sale"
      />
    </div>
    <div className="carousel-item">
      <img
        src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/herotator/Pc/Apparel_1500x400._CB544017564_.jpg"
        className="d-block w-100"
        alt="Electronics"
      />
    </div>
    <div className="carousel-item">
      <img
        src="https://m.media-amazon.com/images/G/31/img24hp/tf/WhatsApp_Image_2025-08-18_at_14.55.27_d0f5e261._CB802203197_.jpg"
        className="d-block w-100"
        alt="Fashion"
      />
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>
</div>



      
      <h3 className="mb-4 text-center">Top Offers</h3>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <img
              src="https://m.media-amazon.com/images/G/31/img24/Fashion/AF/Post/Jupiter/BAU/Unrec/BudgetAddOns/Women_Watches._CB543855118_.png"
              className="card-img-top"
              alt="Electronics"
            />
            <div className="card-body">
              <h5 className="card-title">Electronics</h5>
              <p className="card-text">Up to 40% off on smartphones, laptops & accessories.</p>
              <button className="btn btn-primary">Shop Now</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <img
              src="https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/tommy_hilfiger._CB796416313_.png"
              className="card-img-top"
              alt="Fashion"
            />
            <div className="card-body">
              <h5 className="card-title">Fashion</h5>
              <p className="card-text">Trendy outfits with up to 60% discount this season.</p>
              <button className="btn btn-primary">Explore</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <img
              src="https://m.media-amazon.com/images/G/31/img21/Wireless/vinambia/realmepriceaug8/NARZO_80_Lite_580x740.png"
              className="card-img-top"
              alt="Home Essentials"
            />
            <div className="card-body">
              <h5 className="card-title">Home Essentials</h5>
              <p className="card-text">Everything you need for your home, at great prices.</p>
              <button className="btn btn-primary">Browse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
