import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ViewCart from "./ViewCart";
import Checkout from "./Checkout";
import CartProvider from "./CartProvider";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path="products" element={<Products />} />
          <Route path="view_cart" element={<ViewCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="CartProvider" element={<CartProvider />} />
        </Route>
      </Routes>
    </Router>
  );
}






function Welcome() {
  return (
    <Box sx={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Krispy Kreme
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your favorite donuts, now online!
      </Typography>
    </Box>
  );
}
