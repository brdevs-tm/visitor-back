const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hamidov.pro";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: "Invalid email" });
    }
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
