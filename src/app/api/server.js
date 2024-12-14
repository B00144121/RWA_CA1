const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// Middleware
app.use(
  cors({
    origin: 'https://rwa-ca-1-z3zg-nqeh5md9j-b00144121s-projects.vercel.app', // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://user:passcode@krispy-kreme.8z9g4.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-Kreme', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Session setup
app.use(
  session({
    secret: 'mysecretkey', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://user:passcode@krispy-kreme.8z9g4.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-Kreme',
    }),
    cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,


    },

    })
    ;


      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'customer' },
});

const purchaseItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [purchaseItemSchema],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model('User', userSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

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



// Routes
// User Login
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // Save user details in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'customer', // Default role is 'customer'
    };

    await req.session.save(); // Save session explicitly

    console.log('Session saved:', req.session.user);

    res.status(200).json({
      message: 'Logged in successfully!',
      user: req.session.user,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed due to server error.' });
  }
});



// Purchase Route
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

    res.status(201).json({ message: 'Purchase saved successfully!', purchase: savedPurchase });
  } catch (error) {
    console.error('Error saving purchase:', error);
    res.status(500).json({ error: 'Failed to save purchase.' });
  }
});

// Start the server
const PORT = 3001; // Set your desired port here
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
