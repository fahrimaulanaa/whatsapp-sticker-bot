async function showMenu() {
    return `
*Welcome to the Crypto Bot* 🤖
    
*Commands For Web3 Purpose:*
- *Crypto Prices*:
    - To get the price of a crypto, type: *".price {crypto}"*.
    - To get the category of a crypto, type: *".category {crypto}"*\n.
- *Contract Information*:
    - To get information about a contract, type: *".searchContract {contract}"*.
- *Whale Alerts*:
    - To get whale alerts for a specific coin, type: *".getWhale {coin}"*.
- *Stickers*:
    - To convert a sticker to an image, type: *".toimg"*.
    - To convert an image to a sticker, type: *".s"* or *".sticker"*.
- *Help*:
    - To show this menu, type: *".menu"*\n\n.

*Command For General Purpose:*
- *Sticker Making*:
    - To make a sticker, type: *".s"* or reply a image with *".tosticker"*.
    `;
}

module.exports = { showMenu };
