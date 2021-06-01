//api url
const api = "http://api.exchangeratesapi.io/v1/"
const access_key = "edaacba800bd578b7789c115d34a0738";

//elements
const form = document.getElementById('form');
const el_currency_one = document.getElementById("currency_one");
const el_currency_two = document.getElementById("currency_two");
const el_amount = document.getElementById("amount");
const el_btn_calculate = document.getElementById("btn_calculate");
const el_result = document.getElementById("result");

//latest currency elements
const el_dollar = document.getElementById("dollar");
const el_euro = document.getElementById("euro");
const el_pound = document.getElementById("pound");

//update latest currency elements
const el_update = document.getElementById("update");

el_update.addEventListener('click', function () {
    removeItemFromLocalStorage();
    getFromLocalStorage();
    showAlert();
})

function showAlert() {
    var alert = `
    <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
    Updated Currencies!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

    const row = document.getElementById('latestCurrencies');
    row.insertAdjacentHTML("afterend", alert);

    setTimeout(() => {
        const element = document.querySelector('#alert').remove();
    }, 2000);
}

getFromLocalStorage();

function saveToLocalStorage() {
    fetch(`${api}latest?access_key=${access_key}&symbols=USD,CAD,GBP,TRY&format=1`)
        .then((response) => response.json())
        .then((data) => {
            setLatestCurrencies(data.rates);
            localStorage.setItem('latestCurrencies', JSON.stringify(data));
        });
};

function removeItemFromLocalStorage() {
    localStorage.removeItem('latestCurrencies');
}

function getFromLocalStorage() {
    const curs = JSON.parse(localStorage.getItem('latestCurrencies'));
    if (curs != null) {
        setLatestCurrencies(curs.rates);
    }
    else {
        saveToLocalStorage();
    }
}

function setLatestCurrencies(obj) {
    el_dollar.innerHTML = ((1 / obj.USD) * obj.TRY).toFixed(4) + ' TRY';
    el_euro.innerHTML = (obj.TRY).toFixed(4) + ' TRY';
    el_pound.innerHTML = ((1 / obj.GBP) * obj.TRY).toFixed(4) + ' TRY';
}

form.addEventListener('submit', send);
function send(e) {
    e.preventDefault();
}

//load symbols
fetch("./currencies.json")
    .then(res => res.json())
    .then(data => {
        const keys = Object.keys(data);
        const values = Object.values(data);

        let options = '';

        for (let i = 0; i < keys.length; i++) {
            options += `<option value=${keys[i]}>${values[i]}</option>`
        }
        el_currency_one.innerHTML += options;
        el_currency_two.innerHTML += options;
    });

//Click event
el_btn_calculate.addEventListener('click', function () {

    if (el_currency_one.value === '' || el_currency_two.value === '' || el_amount.value === '') {
        return;
    }

    const base_currency = el_currency_one.value;
    const target_currency = el_currency_two.value;
    const amount = el_amount.value;

    fetch(`${api}latest?access_key=${access_key}&format=1`)
        .then((response) => response.json())
        .then((data) => {
            const rate = data.rates[target_currency];
            const baseRate = data.rates[base_currency];
            if (base_currency === 'EUR') {
                el_result.innerHTML = `${amount} ${base_currency} = ${(amount * rate).toFixed(4)} ${target_currency}`;
            }
            else if (target_currency === 'EUR') {
                el_result.innerHTML = `
                ${amount} ${base_currency} 
                = 
                ${(amount / baseRate).toFixed(4)} ${target_currency}`;
            }
            else {
                el_result.innerHTML = `
                ${amount} ${base_currency} 
                = 
                ${((amount * rate) / baseRate).toFixed(4)} ${target_currency}`;
            }
        });

})