const axios = require("axios");

const getGeoData = async (ip) => {
  try {
    const response = await axios.get(`https://freegeoip.app/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error("Geo service error:", error);
    return {
      city: "Unknown",
      region_name: "Unknown",
      country_name: "Unknown",
      latitude: 0,
      longitude: 0,
    };
  }
};

module.exports = { getGeoData };
