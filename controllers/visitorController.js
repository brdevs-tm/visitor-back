const axios = require("axios");
const useragent = require("useragent");
const Visitor = require("../models/Visitor");
const telegramService = require("../services/telegramService");
const geoService = require("../services/geoService");

exports.trackVisitor = async (req, res) => {
  try {
    const { ip, userAgent } = req.body;
    const agent = useragent.parse(userAgent);
    const device = `${agent.device.family} ${agent.os.family}`;
    const geoData = await geoService.getGeoData(ip);
    const { city, region_name, country_name, latitude, longitude } = geoData;

    const visitorData = {
      ip,
      userAgent,
      device,
      location: { city, region: region_name, country: country_name },
      coords: { lat: latitude, lng: longitude },
      visitTime: new Date(),
    };

    const visitor = new Visitor(visitorData);
    await visitor.save();
    await telegramService.sendBotMessage(visitorData);

    res.status(201).json({ message: "Visitor tracked successfully" });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error("Error fetching visitor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
