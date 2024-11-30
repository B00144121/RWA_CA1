"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Products from "./products";
import Checkout from "./checkout";
import Register from "./register";
import Login from "./login";
import ManagerPage from "./ManagerPage";
import CustomerPage from "./CustomerPage";
import ViewCart from "./viewcart"; // Import ViewCart

export default function Home() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]); // State to track cart items

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to render pages based on state
  const renderPage = () => {
    switch (page) {
      case "products":
        return <Products onAddToCart={handleAddToCart} />; // Pass add-to-cart handler
      case "viewCart":
        return <ViewCart cart={cart} setPage={setPage} />; // Pass cart and navigation handler
      case "checkout":
        return <Checkout cart={cart} />; // Pass cart to checkout
      case "register":
        return <Register />;
      case "login":
        return <Login setPage={setPage} />;
      case "manager":
        return <ManagerPage />;
      case "customer":
        return <CustomerPage />;
      default:
        return (
          <Box
            sx={{
              textAlign: "center",
              mt: "64px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              backgroundColor: "#fff8e1", // Light cream background for warmth
              padding: "2rem",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: "#d32f2f", fontWeight: "bold" }}
            >
              Welcome to Krispy Kreme
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ color: "#5d4037", fontSize: "1.2rem" }}
            >
              Your favorite donuts, now online! Enjoy our delicious treats and
              shop with ease.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  backgroundColor: "#4caf50", // Green button
                  "&:hover": { backgroundColor: "#388e3c" },
                }}
                onClick={() => setPage("register")}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  backgroundColor: "#1976d2", // Blue button
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={() => setPage("login")}
              >
                Login
              </Button>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fce4ec", // Light pink background for the whole app
      }}
    >
      {/* AppBar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#d32f2f" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Krispy Kreme
          </Typography>
          <Box>
            <Button
              color="inherit"
              onClick={() => setPage("home")}
              sx={{ fontWeight: "bold" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("products")}
              sx={{ fontWeight: "bold" }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("viewCart")}
              sx={{ fontWeight: "bold" }}
            >
              View Cart ({cart.length}) {/* Display cart item count */}
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("checkout")}
              sx={{ fontWeight: "bold" }}
            >
              Checkout
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("register")}
              sx={{ fontWeight: "bold" }}
            >
              Register
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("login")}
              sx={{ fontWeight: "bold" }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render Page Content */}
      <Box sx={{ mt: "64px", flex: 1 }}>{renderPage()}</Box>
    </Box>
  );
}
