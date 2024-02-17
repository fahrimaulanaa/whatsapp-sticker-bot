async function searchContract(contract) {
    const apikey = 'F1HWJURTVDK3GYI33R224F9R8YABZG9N3V'
    const url = `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${contract}&apikey=${apikey}`
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "1" && data.result.length > 0) {
        const contracts = data.result;

        for (const contractInfo of contracts) {
            const message = `💎Contract Address: ${contractInfo.contractAddress}\n\n✅Contract Creator: ${contractInfo.contractCreator}\n\n🔥Transaction Hash: ${contractInfo.txHash}`;
            return message;
        }
    } else {
        const message = `Contract not found`;
        return message;
    }
}

module.exports = { searchContract };