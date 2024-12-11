app.post('/api/purchase', async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    // Validate product IDs
    const productIds = cart.map((item) => item._id);
    const validProducts = await Product.find({ _id: { $in: productIds } });

    if (validProducts.length !== cart.length) {
      return res.status(400).json({ error: 'One or more products in the cart are invalid.' });
    }

    // Map validated items
    const validatedItems = cart.map((item) => {
      const product = validProducts.find((p) => p._id.toString() === item._id);
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity || 1,
      };
    });

    // Calculate total
    const total = validatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Save the purchase
    const purchase = new Purchase({
      userId: req.session?.user?.id || null,
      items: validatedItems,
      total,
    });

    const savedPurchase = await purchase.save();

    res.status(201).json({ message: 'Purchase saved successfully!', purchase: savedPurchase });
  } catch (error) {
    console.error('Error saving purchase:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to save purchase.' });
  }
});
