// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Initialize the app and set up a port
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kushang:kushang304>@bookswapdb.7slbr.mongodb.net/bookSwapDB?retryWrites=true&w=majority&appName=bookSwapDB",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB - userData database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());

// Define a Mongoose schema and model for user data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "user"); // Explicitly specify 'user' as the collection name

// Route for user signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, address, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phone,
      address,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
