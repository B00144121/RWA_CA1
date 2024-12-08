app.post('/api/purchase', async (req, res) => {
  try {
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const purchase = new Purchase({
      userId,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: 1,
      })),
      total,
    });

    await purchase.save();

    res.status(201).json({ message: 'Purchase saved successfully', purchase });
  } catch (err) {
    console.error('Error saving purchase:', err);
    res.status(500).json({ error: 'Failed to save purchase', details: err.message });
  }
});
