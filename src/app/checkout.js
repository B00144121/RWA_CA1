import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import axios from "axios";

export default function Checkout({ cart }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/purchase", {
        cart, // Only send the cart data
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert("Error processing purchase: " + error.response?.data?.error || error.message);
    }
  };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Total: ${calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handlePurchase}
          >
            Purchase
          </Button>
        </>
      )}
    </Box>
  );
}

