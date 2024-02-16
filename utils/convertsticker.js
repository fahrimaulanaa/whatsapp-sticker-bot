async function convertToSticker(msg) {
    const chat = await msg.getChat();

    if (msg.hasMedia) {
        const media = await msg.downloadMedia();

        if (media.mimetype.startsWith('image/')) {
            // For images
            await chat.sendMessage(media, { sendMediaAsSticker: true });
            await chat.sendMessage('Sticker created successfully!');
        } else if (media.mimetype.startsWith('video/')) {
            // For videos
            try {
                await chat.sendMessage(media, { sendMediaAsSticker: true, mediaType: 'video', ffmpegPath: path.resolve(__dirname, 'path/to/ffmpeg') });
            } catch (videoError) {
                console.error(`Error sending video sticker: ${videoError.message}`);
            }
        } else {
            chat.sendMessage('Please send an image or video with the ".s" command to convert it to a sticker.');
        }
    } else {
        chat.sendMessage('Please send an image or video with the ".s" command to convert it to a sticker.');
    }
}

module.exports = { convertToSticker };