
const qrcode = require('qrcode-terminal');
const path = require('path');


const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { convertToSticker } = require('./utils/convertsticker');
const { stickerToImage } = require('./utils/stickerToImage');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

//reply sticker with ('.toimg') command convert sticker to image
client.on('message', async (msg) => {
    if (msg.body === '.toimg') {
        try {
            await stickerToImage(msg);
        } catch (error) {
            console.error(error);
        }
    }
});



// Listen for messages and call the function if the command is '.s'
client.on('message', async (msg) => {
    try {
        if (msg.body === '.s' || msg.body === '.sticker') {
            await convertToSticker(msg);
        }
    } catch (error) {
        console.error(error);
    }
});





client.initialize();
