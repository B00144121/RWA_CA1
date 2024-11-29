nodeconst express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("./models/Product"); // Mongoose model

// Route to fetch products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products); // Send products as JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
