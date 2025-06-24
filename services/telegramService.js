const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

const sendBotMessage = async (data) => {
  const message = `
📥 Yangi tashrif:
🌐 IP: ${data.ip}
📍 Joylashuv: ${data.location.city}, ${data.location.region_name}, ${
    data.location.country_name
  }
📱 Qurilma: ${data.device}
🛰️ Koordinatalar: Lat: <code>${data.coords.lat}</code>, Long: <code>${
    data.coords.lng
  }</code>
🕒 Vaqt: ${new Date(data.visitTime).toLocaleString()}
🔍 User-Agent: <code>${data.userAgent}</code>
    `;
  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error("Telegram error:", error);
  }
};

module.exports = { sendBotMessage };
