async function getWhaleAlert(coin) {
    try {
        const url = `https://api.whale-alert.io/v1/transactions?api_key=Nk2ry3QmafsZ0zFd7s3rMKxSlGYACWdl&min_value=500000&currency=${coin}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        const transactions = data.transactions;

            const messages = [];

            for (const transaction of transactions) {
                const unixTimestamp = transaction.timestamp;
                const parsedTimestamp = parseUnixTimestamp(unixTimestamp);

                const message = `*🐋Whale Alert🐋*\n\n🔗Blockchain: ${transaction.blockchain}\n🔥Transaction Type: ${transaction.transaction_type}\n #️⃣Transaction Hash: ${transaction.hash}\n📅Time: ${parsedTimestamp}\n💰Value: ${transaction.amount} ${transaction.symbol} || $${transaction.amount_usd}\n\n*👤SENDER INFORMATION👤*\n🕴️From:  ${transaction.from.address}\n🦉Owner: ${transaction.from.owner}\n🦖Owner Type: ${transaction.from.owner_type}\n\n*👤RECEIPENT INFORMATION👤*\n🕴️Receipent:  ${transaction.to.address}\n🦉Owner: ${transaction.to.owner}\n🦖Owner Type: ${transaction.to.owner_type}\n\n*🏷️TRANSACTION ID🏷️*\n${transaction.id}`;
                messages.push(message);
            }

            return messages;
        } catch (error) {
        console.error(error);
        return { count: 0, messages: ['Error fetching Whale Alerts'] }; // Handle errors by returning 0 count and an error message
    }
}

function parseUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, // Use 24-hour format
    };

    const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDateTime;
}

module.exports = { getWhaleAlert };
