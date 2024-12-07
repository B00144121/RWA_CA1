app.post('/api/purchase', async (req, res) => {
  const { cart } = req.body; // Only expect `cart` from frontend

  try {
    // Retrieve userId from session
    const userId = req.session.user ? req.session.user.id : null;

    if (!userId) {
      return res.status(401).json({ error: 'User not logged in.' });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    // Calculate the total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Create a new purchase
    const purchase = new Purchase({
      userId,
      items: cart.map((item) => ({
        productId: item._id, // Ensure `_id` is passed from frontend
        quantity: 1,
      })),
      total,
    });

    // Save the purchase to MongoDB
    await purchase.save();

    res.status(201).json({ message: 'Purchase saved successfully!', purchase });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save purchase', details: error.message });
  }
});

