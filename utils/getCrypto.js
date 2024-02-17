async function getPriceCrypto(coin) {
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
        const response = await fetch(url);
        const data = await response.json();
        const price = data[coin].usd;
        return price;
    } catch (error) {
        console.error(error);
    }
}

async function getCryptoCategory(coin){
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${coin}`;
        const response = await fetch(url);
        const data = await response.json();
        const categories = data.categories;
        for (const category of categories) {
            return category;
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getPriceCrypto, getCryptoCategory};