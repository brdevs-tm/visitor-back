const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  visitTime: {
    type: Date,
    default: Date.now,
  },
  location: {
    city: String,
    region: String,
    country: String,
  },
  coords: {
    lat: Number,
    lng: Number,
  },
  device: String,
  userAgent: String,
});

module.exports = mongoose.model("Visitor", visitorSchema);
