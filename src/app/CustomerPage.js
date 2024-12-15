import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";

export default function CustomerPage() {
  const [weather, setWeather] = useState(null); // State to store weather data

  // Fetch weather data on page load
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getWeather");
        const data = await response.json();
        setWeather(data); // Set weather data to state
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  // Updated products array with 6 options
  const products = [
    { name: "Glazed Donut", description: "A tasty treat for any occasion.", price: 1.99, image: "https://via.placeholder.com/150" },
    { name: "Chocolate Donut", description: "A rich chocolatey treat.", price: 2.49, image: "https://via.placeholder.com/150" },
    { name: "Strawberry Donut", description: "A sweet strawberry treat.", price: 2.29, image: "https://via.placeholder.com/150" },
    { name: "Blueberry Donut", description: "Bursting with blueberry flavor.", price: 2.69, image: "https://via.placeholder.com/150" },
    { name: "Maple Donut", description: "Rich maple glaze for sweet cravings.", price: 2.89, image: "https://via.placeholder.com/150" },
    { name: "Cinnamon Donut", description: "Perfectly spiced with cinnamon.", price: 1.99, image: "https://via.placeholder.com/150" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#d32f2f" }}>
        Welcome, Customer!
      </Typography>

      {/* Display today's temperature */}
      <Typography variant="h6" gutterBottom>
        Today's Temperature: {weather ? `${weather.temp}°C` : "Loading..."}
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Browse our delicious selection of donuts.
      </Typography>

      {/* Product Grid */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", mt: 1, color: "#d32f2f" }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => console.log(`Added ${product.name} to cart`)} // Replace with your cart logic
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Back to Home Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => (window.location.href = "/")}
      >
        Go Back to Home
      </Button>
    </Box>
  );
}
