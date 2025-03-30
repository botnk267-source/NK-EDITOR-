const axios = require("axios");

const baseApiUrl = async () => "https://mahmud-x8mi.onrender.com/jan/font3";

async function getBotResponse(message) {
  try {
    const base = await baseApiUrl();
    const response = await axios.get(`${base}/${encodeURIComponent(message)}`);
    return response.data?.message || "আমি বুঝতে পারছি না, আবার চেষ্টা করুন!";
  } catch (error) {
    console.error("API Error:", error.message || error);
    return "error janu 🥲";
  }
}

module.exports = {
  config: {
    name: "bot2",
    version: "1.7",
    author: "MahMUD",
    role: 0,
    description: { en: "no prefix command." },
    category: "ai",
    guide: { en: "just type jan" },
  },

  onStart: async function () {},

  removePrefix: function (str, prefixes) {
    for (const prefix of prefixes) {
      if (str.startsWith(prefix)) {
        return str.slice(prefix.length).trim();
      }
    }
    return str;
  },

  onReply: async function ({ api, event }) {
    if (event.type === "message_reply") {
      let message = event.body.toLowerCase();
      message = this.removePrefix(message, ["jan"]) || "opp2";
      if (message) {
        const replyMessage = await getBotResponse(message);
        api.sendMessage(replyMessage, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "bot2",
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              text: replyMessage,
            });
          }
        }, event.messageID);
      }
    }
  },

  onChat: async function ({ api, event }) {
    const responses = [
      "babu khuda lagse🥺",
      "Hop beda😾, Boss বল boss😼",
      "আমাকে ডাকলে, আমি কিন্তূ কিস করে দেবো😘",
      "🐒🐒🐒",
      "bye",
      "আমার Boss রে মেসেজ দে m.me/amitmax44",
      "mb ney bye",
      "meww",
      "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏",
      "𝗜 𝗹𝗼𝘃𝗲 𝘆𝗼𝘂__😘😘",
      "𝗜 𝗵𝗮𝘁𝗲 𝘆𝗼𝘂__😏😏","জান একটু আদর দাও না 🥺", "Bot বললে কিস করে দেবো কিন্তু 😘","তুই কাল দেখা করিস একটু 😈","🪄 তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই, তাতে যা হই হোক 🤧🥱","🤔 বলদা তোর কথা তোর বাড়ি কেউ শুনে না, তো আমি কেন শুনবো?","🥰 আমি তোমাকে অনেক ভালোবাসি বাবু 🥺💖","চলো চলে যাই বিদেশ্যে🤥","🍹 এই নাও জুস খাও, বট বলতে বলতে হাপায় গেছো না 🥲","💬 Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋","🌸 দেখা হলে কাঠগোলাপ দিও 🤗","What adventures await us today? 🌈","😒 এত বট বট না করে টাকা ও পাঠাতে পারো 😏","😒 তোর কি চোখে পড়ে না আমি ব্যস্ত আছি 😒","🫡 তোরে মারার প্রিপারেশন নিছি 😌","🐸 তরা নাকি প্রেম করস... আমারে একটা করাই দিলেও কি হয় 🥺","👀 হেহে বাবু, আমার কাছে আসো 😘💋","😍 হুম জান বলো 😎","😘 I love you! আমার সোনা, ময়না, টিয়া 😍","🥰 আমি তোমাকে অনেক ভালোবাসি বাবু 🥺💖","😒 আমাকে ডাকলে, আমি কিন্তু কিস করে দিবো 😘"
    ];

    let message = event.body ? event.body.toLowerCase() : "";
    const words = message.split(" ");
    const wordCount = words.length;

    if (event.type !== "message_reply" && message.startsWith("jan")) {
      api.setMessageReaction("😍", event.messageID, () => {}, true);
      api.sendTypingIndicator(event.threadID, true);

      if (wordCount === 1) {
        api.sendMessage({ body: responses[Math.floor(Math.random() * responses.length)] }, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "bot2",
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              link: responses[Math.floor(Math.random() * responses.length)],
            });
          }
        }, event.messageID);
      } else {
        words.shift();
        const userText = words.join(" ");
        const botResponse = await getBotResponse(userText);
        api.sendMessage(botResponse, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName: "bot2",
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              text: botResponse,
            });
          }
        }, event.messageID);
      }
    }
  },
};
