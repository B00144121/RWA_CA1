app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Save the user's details in the session
    req.session.user = { id: user._id, name: user.name, email: user.email };
    await req.session.save(); // Ensure the session is saved

    console.log('Session saved:', req.session.user);

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});
