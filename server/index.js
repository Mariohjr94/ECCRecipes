const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/authRoutes");
const freezerItemRoutes = require("./routes/freezerItemRoutes");
const freezerCategoryRoutes = require("./routes/freezerCategories");

app.use("/api/auth", authRoutes);
app.use("/api/freezer-items", freezerItemRoutes);
app.use("/api/freezer-categories", freezerCategoryRoutes);


// Routes (we'll add these next)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

