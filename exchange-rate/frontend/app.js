async function getLatestRate() {
    const fromCurrency = document.getElementById('from-currency').value.toUpperCase();
    const toCurrency = document.getElementById('to-currency').value.toUpperCase();

    try {
        const response = await fetch('http://localhost:3000/api/latest');
        const data = await response.json();

        // Comprobar si las monedas existen en el objeto de tasas
        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];

        if (fromRate && toRate) {
            const rate = toRate / fromRate; // Calcular la tasa de cambio
            document.getElementById('result').textContent = `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
        } else {
            document.getElementById('result').textContent = 'Una de las monedas no es válida.';
        }
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        document.getElementById('result').textContent = 'Error al obtener la tasa de cambio.';
    }
}

async function getHistoricalRate() {
    const date = document.getElementById('Historical-date').value; 
    const fromCurrency = document.getElementById('from-currency-historical').value.toUpperCase();
    const toCurrency = document.getElementById('to-currency-historical').value.toUpperCase();

    if (!date) {
        document.getElementById('Historical-result').textContent = 'Por favor, selecciona una fecha.';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/historical/${date}`);
        const data = await response.json();

        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];

        // Verificar si los códigos de moneda son válidos
        if (!fromRate || !toRate) {
            document.getElementById('Historical-result').textContent = 'Una de las monedas no es válida. Asegúrate de usar códigos de moneda correctos como USD, EUR, JPY, etc.';
            return;
        }

        const rate = toRate / fromRate; 
        document.getElementById('Historical-result').textContent = `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency} en la fecha ${date}`;
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
        document.getElementById('Historical-result').textContent = 'Error al obtener la tasa de cambio histórica.';
    }
}


async function getCurrencies() {
    const response = await fetch('http://localhost:3000/api/currencies');
    const currencies = await response.json();
    return currencies;
}

async function populateCurrencyOptions() {
    const currencyData = await getCurrencies();
    const currencyDisplay = document.getElementById('currency-display');

    currencyDisplay.innerHTML = '';

    for (const [code, name] of Object.entries(currencyData)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name}, ${code}`;
        currencyDisplay.appendChild(listItem);
    }
}

window.onload = populateCurrencyOptions;
