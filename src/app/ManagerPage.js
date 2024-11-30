import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function ManagerPage() {
  // Hardcoded products and orders
  const [products] = useState([
    { name: "Glazed Donut", price: 1.99 },
    { name: "Chocolate Donut", price: 2.49 },
    { name: "Strawberry Donut", price: 2.29 },
    { name: "Blueberry Donut", price: 2.69 },
    { name: "Maple Donut", price: 2.89 },
    { name: "Cinnamon Donut", price: 1.99 },
  ]);

  const [orders] = useState([
    {
      orderId: 1,
      customer: "Alice",
      items: [
        { name: "Glazed Donut", price: 1.99 },
        { name: "Chocolate Donut", price: 2.49 },
      ],
    },
    {
      orderId: 2,
      customer: "Bob",
      items: [
        { name: "Strawberry Donut", price: 2.29 },
        { name: "Maple Donut", price: 2.89 },
      ],
    },
  ]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Products Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Products
      </Typography>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText primary={product.name} secondary={`$${product.price.toFixed(2)}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      {/* Orders Section */}
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      {orders.map((order) => (
        <Box key={order.orderId} sx={{ mb: 3 }}>
          <Typography variant="h6">
            Order #{order.orderId} - Customer: {order.customer}
          </Typography>
          <List>
            {order.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
