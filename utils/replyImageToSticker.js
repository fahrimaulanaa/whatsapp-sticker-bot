async function replyImageToSticker(msg) {
    const chat = await msg.getChat();
    if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.hasMedia) {
            const media = await quotedMsg.downloadMedia();
            if (media.mimetype === 'image/jpeg' || media.mimetype === 'image/png') {
                chat.sendMessage(media, { sendMediaAsSticker: true });
            } else {
                chat.sendMessage('This is not an image');
            }
        }
    }
}

module.exports = { replyImageToSticker };