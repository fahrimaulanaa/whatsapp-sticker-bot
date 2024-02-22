const qrcode = require("qrcode-terminal");
const path = require("path");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const { convertToSticker } = require("./utils/convertsticker");
const { stickerToImage } = require("./utils/stickerToImage");
const { getPriceCrypto, getCryptoCategory } = require("./utils/getCrypto");
const { searchContract } = require("./utils/getContract");
const { getWhaleAlert } = require("./utils/whaleAlert");
const { showMenu } = require("./utils/menu");
const { replyImageToSticker } = require("./utils/replyImageToSticker");
const { getSahamPrice } = require("./utils/saham/getPrice");
const { getSahamVolume } = require("./utils/saham/getVolume");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

//listen for getSaham
client.on("message", async (msg) => {
  if (msg.body.startsWith(".stock")) {
    const ticker = msg.body.split(" ")[1];
    const stockPrice = await getSahamPrice(ticker);
    msg.reply(`The price of ${ticker} is Rp.${stockPrice}`);
  }
})

//listen for getSahamVolume
client.on("message", async (msg) => {
  if (msg.body.startsWith(".volume")) {
    const ticker = msg.body.split(" ")[1];
    const stockVolume = await getSahamVolume(ticker);
    msg.reply(`The volume of ${ticker} is ${stockVolume}`);
  }
})

// Listen for messages and call the function if the command is '.menu'
client.on("message", async (msg) => {
  if (msg.body === ".menu" || msg.body === ".help") {
    const menu = await showMenu();
    console.log(menu);
    msg.reply(menu);
  } else {
    console.log("Received message:", msg.body, "from", msg.from);
  }
});


//reply sticker with ('.toimg') command convert sticker to image
client.on("message", async (msg) => {
  if (msg.body === ".toimg") {
    try {
      await stickerToImage(msg);
    } catch (error) {
      console.error(error);
    }
  } else if (
    msg.body === ".tosticker" ||
    msg.body === ".sticker" ||
    msg.body === ".s"
  ) {
    try {
      await replyImageToSticker(msg);
    } catch (error) {
      console.error(error);
    }
  }
});

// Listen for messages and call the function if the command is '.s'
client.on("message", async (msg) => {
  try {
    if (msg.body === ".s" || (msg.body === ".sticker" && msg.hasMedia)) {
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
  } else if (msg.body.startsWith(".getWhale")) {
    const coin = msg.body.split(" ")[1];
    if (!coin) {
      msg.reply("Please specify a coin.");
    }
    const whaleAlert = await getWhaleAlert(coin);
    console.log(whaleAlert);
    if (whaleAlert.count === 0) {
      msg.reply("No Whale Alerts found for the specified coin.");
    } else {
      for (const whale of whaleAlert.messages) {
        msg.reply(whale);
      }
    }
  }
});

client.initialize();
