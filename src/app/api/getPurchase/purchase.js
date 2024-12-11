app.post('/api/purchase', async (req, res) => {
  try {
    const { cart } = req.body;

    // Get user ID from session (or use a guest user fallback)
    const userId = req.session?.user?.id || null;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    // Calculate total price
    const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

    // Create and save purchase
    const purchase = new Purchase({
      userId,
      items: cart.map((item) => ({
        productId: item._id || 'unknown',
        name: item.name || 'Unnamed Item',
        price: item.price || 0,
        quantity: item.quantity || 1,
      })),
      total,
    });

    const savedPurchase = await purchase.save();

    // Save purchase details in the session
    if (!req.session.purchases) {
      req.session.purchases = []; // Initialize session purchases array
    }
    req.session.purchases.push(savedPurchase); // Add the new purchase
    await req.session.save(); // Explicitly save the session

    res.status(201).json({ message: 'Purchase saved successfully!', purchase: savedPurchase });
  } catch (error) {
    console.error('Error saving purchase:', error);
    res.status(500).json({ error: 'Failed to save purchase.' });
  }
});
