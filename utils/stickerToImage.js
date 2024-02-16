async function stickerToImage(msg) {
    const chat = await msg.getChat();
    if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const media = await quotedMsg.downloadMedia();
            if (media.mimetype === 'image/webp') {
                chat.sendMessage(media, { caption: 'This is your image' });
            } else {
                chat.sendMessage('This is not a sticker');
            }
        }
    }
}

module.exports = { stickerToImage };