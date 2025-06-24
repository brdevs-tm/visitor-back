const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const trackRoutes = require("./routes/trackRoutes");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", trackRoutes);
app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
