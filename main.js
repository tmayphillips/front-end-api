window.addEventListener('DOMContentLoaded', main)
const apiKey = 'dec2eb14e928c120a3bbe4ae'
let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`

let currencySymbols = [
    {country: 'Australian Dollor', code:'AUD'}, 
    {country: 'Canadian Dollar', code: 'CAD'},
    {country: 'British Pound', code: 'GBP'},
    {country: 'Euro', code: 'EURO'},
    {country: 'US Dollar', code: 'USD'},
    {country: 'Swiss Franc', code: 'CHF'},
    {country: 'Japanese Yen', code: 'JPY'}
]

function main() {
    const conversionForm = document.getElementById('conversionForm')
    const list = document.querySelector('.list')

    function createCurrencyList() {
        let template = currencySymbols.map(element => `
            <li>${element.country}: ${element.code}</li>
        `).join('')
        return template
    }

    conversionForm.addEventListener('submit', event => {
        event.preventDefault()
        let convertedFrom = document.getElementById('from').value 
        let convertedTo = document.getElementById('to').value 
        let amount = parseFloat(document.getElementById('amount').value)
        
        url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${convertedFrom}`
        getDataFromApi(convertedFrom, convertedTo, amount)
    }) 

    async function getDataFromApi(convertedFrom, convertedTo, amount){
        const response = await fetch(url);
        let data = await response.json();
        let conversionRate = data.conversion_rates[convertedTo]
        let convertedAmount = amount * conversionRate
        convertedAmount = convertedAmount.toFixed(2)
        amount = amount.toFixed(2)
        document.getElementById('convertedAmount').innerHTML = `${amount} ${convertedFrom} = ${convertedAmount} ${convertedTo}`
        document.getElementById('from').value = ''
        document.getElementById('to').value = ''
        document.getElementById('amount').value = ''
    }

    function render() {
        list.innerHTML = createCurrencyList()
    }

    render()
}