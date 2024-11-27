import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

export default function Checkout({ cart }) {
  const handlePurchase = () => {
    alert("Thank you for your purchase!");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Total: $
        {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePurchase}>
        Purchase
      </Button>
    </Box>
  );
}
