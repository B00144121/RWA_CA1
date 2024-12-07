import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

export default function ViewCart({ cart, setPage }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Box>
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
            onClick={() => setPage("checkout")} // Navigate to the Checkout page using setPage
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}
