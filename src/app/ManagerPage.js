import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function ManagerPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Manager Page
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This page is currently under construction. Stay tuned for updates!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
      >
        Go Back to Home
      </Button>
    </Box>
  );
}
