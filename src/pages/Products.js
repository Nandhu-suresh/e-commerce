import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (category = "") => {
    try {
      let url = "http://localhost:5000/products";
      if (category) {
        url += `?category=${category}`; 
      }
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category); 
  };

  
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} added to cart!`);
  };

  
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    if (!exists) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("storage"));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in wishlist!`);
    }
  };

  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <Container className="mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>

        <div className="d-flex gap-3">
          
          <Form.Select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>

           
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </Form.Select>
        </div>
      </div>

      
      <Row>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Col md={4} key={product.id || product._id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "550px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">{product.category}</small>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => addToWishlist(product)}
                    >
                      Wishlist
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </Container>
  );
}

export default Products;
