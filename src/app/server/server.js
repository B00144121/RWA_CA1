// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://user:passcode@krispy-kreme.8z9g4.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-Kreme', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configure sessions
app.use(
  session({
    secret: 'mysecretkey', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://user:passcode@krispy-kreme.8z9g4.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-Kreme', // Same MongoDB URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // Add a role field ('customer' or 'manager')
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const purchaseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Link purchase to a user
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  total: Number,
  date: { type: Date, default: Date.now },
});

// Create models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

// POST route to save a purchase
app.post('/api/purchase', async (req, res) => {
  try {
    // Retrieve userId from the session
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate the total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Prepare the purchase data
    const purchase = new Purchase({
      userId,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: 1, // Assuming quantity is 1 for now
      })),
      total,
    });

    // Save purchase to the database
    await purchase.save();

    res.status(201).json({ message: 'Purchase saved successfully', purchase });
  } catch (err) {
    console.error('Error saving purchase:', err);
    res.status(500).json({ error: 'Failed to save purchase', details: err.message });
  }
});

// Existing routes
// POST route to register a user
app.post('/api/user', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailLowerCase = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLowerCase });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: emailLowerCase,
      password: hashedPassword,
      role, // Assign role to the user
    });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { name, email: emailLowerCase },
    });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST route for login
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

    // Save user session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Save the role in the session
    };

    res.status(200).json({ message: 'Logged in successfully', role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});

// Check session route
app.get('/api/check-session', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ message: 'Session is active', user: req.session.user });
  } else {
    res.status(401).json({ error: 'No active session' });
  }
});

// Example protected route for managers
app.get('/api/manager', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'manager') {
    return res.status(403).json({ error: 'Access denied' });
  }
  res.json({ message: 'Welcome, Manager!' });
});

// Example protected route for customers
app.get('/api/customer', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'customer') {
    return res.status(403).json({ error: 'Access denied' });
  }
  res.json({ message: 'Welcome, Customer!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
