app.post("http://localhost:3000/api/user", async (req, res) => {
  console.log("Request body:", req.body); // Debugging line
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    req.session.user = { id: user._id, name: user.name, email: user.email };

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login. Please try again." });
  }
});
