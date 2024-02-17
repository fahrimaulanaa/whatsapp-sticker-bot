const qrcode = require("qrcode-terminal");
const path = require("path");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const { convertToSticker } = require("./utils/convertsticker");
const { stickerToImage } = require("./utils/stickerToImage");
const { getPriceCrypto, getCryptoCategory } = require("./utils/getCrypto");
const { searchContract } = require("./utils/getContract");
const { getWhaleAlert } = require("./utils/whaleAlert");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

//reply sticker with ('.toimg') command convert sticker to image
client.on("message", async (msg) => {
  if (msg.body === ".toimg") {
    try {
      await stickerToImage(msg);
    } catch (error) {
      console.error(error);
    }
  }
});

// Listen for messages and call the function if the command is '.s'
client.on("message", async (msg) => {
  try {
    if (msg.body === ".s" || msg.body === ".sticker") {
      await convertToSticker(msg);
    }
  } catch (error) {
    console.error(error);
  }
});

//listen for getCryptoprice
client.on("message", async (msg) => {
  if (msg.body.startsWith(".price")) {
    const coin = msg.body.split(" ")[1];
    const price = await getPriceCrypto(coin);
    msg.reply(`The price of ${coin} is $${price}`);
  } else if (msg.body.startsWith(".category")) {
    const coin = msg.body.split(" ")[1];
    const category = await getCryptoCategory(coin);
    msg.reply(`The category of ${coin} is ${category}`);
  } else if (msg.body.startsWith(".searchContract")) {
    const contract = msg.body.split(" ")[1];
    const contractInfo = await searchContract(contract);
    msg.reply(contractInfo);
  } 
  else if (msg.body.startsWith('.getWhale')) {
      const coin = msg.body.split(' ')[1];
      if (!coin) {
          msg.reply('Please specify a coin.');
      }
      const whaleAlert = await getWhaleAlert(coin);
      if (whaleAlert.length === 0) {
          msg.reply('No Whale Alerts found for the specified coin.');
      } else {
          for (const whale of whaleAlert) {
              msg.reply(whale);
          }
      }
  }
  
});

client.initialize();
