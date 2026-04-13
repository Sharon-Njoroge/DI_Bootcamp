const API_KEY = 'YOUR_API_KEY';
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const switchBtn = document.getElementById('switchBtn');
const resultDiv = document.getElementById('result');

// 1. Fetch Supported Currencies on load
async function init() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        const data = await response.json();
        
        if (data.result === "success") {
            populateSelects(data.supported_codes);
        }
    } catch (error) {
        console.error("Error fetching codes:", error);
    }
}

function populateSelects(codes) {
    codes.forEach(([code, name]) => {
        const option1 = new Option(`${code} - ${name}`, code);
        const option2 = new Option(`${code} - ${name}`, code);
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    // Default values
    fromSelect.value = 'USD';
    toSelect.value = 'ILS';
}

// 2. Perform Conversion
async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = amountInput.value;

    if (amount === "" || amount <= 0) return;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
        const data = await response.json();

        if (data.result === "success") {
            resultDiv.innerText = `${data.conversion_result.toFixed(2)} ${to}`;
        }
    } catch (error) {
        resultDiv.innerText = "Error calculating.";
    }
}

// 3. Bonus: Switch Button Logic
function switchCurrencies() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    // Automatically trigger conversion after switch
    convert();
}

// Event Listeners
convertBtn.addEventListener('click', convert);
switchBtn.addEventListener('click', switchCurrencies);

init();