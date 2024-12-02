document.addEventListener('DOMContentLoaded', async () => {
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
        populateCryptoTable(cryptoData);
    }
});

function populateCryptoTable(data) {
    const tableBody = document.getElementById('crypto-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';

        data.forEach((crypto, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon">${crypto.name} </td>
                <td>$${crypto.current_price ? crypto.current_price.toFixed(2) : 'N/A'}</td>
                <td>$${crypto.total_volume ? crypto.total_volume.toLocaleString() : 'N/A'}</td>
                <td>$${crypto.market_cap ? crypto.market_cap.toLocaleString() : 'N/A'}</td>
                <td>${crypto.circulating_supply ? crypto.circulating_supply.toLocaleString() + ' ' + crypto.symbol.toUpperCase() : 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        console.error('Crypto table body element not found');
    }
}

async function fetchCryptoData() {
    const cryptoSymbols = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana', 'ripple', 'dogecoin', 'shiba-inu', 'litecoin', 'matic-network'];
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoSymbols.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch cryptocurrency data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        return null;
    }
}
