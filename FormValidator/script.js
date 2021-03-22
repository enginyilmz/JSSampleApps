const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const formElements = document.querySelectorAll('input');

form.addEventListener('submit', send);

function send(e) {

    formElements.forEach(function (input) { checkRequired(input); });
    validateEmail(email);
    checkLength(username, 7, 15);
    checkLength(password, 7, 12);
    console.log(password);
    console.log(repassword);

    checkPasswords(password, repassword);
    e.preventDefault();
}

function sucess(input) {
    input.classList.replace('is-invalid', 'is-valid')
}

function error(input, message) {
    input.classList.add('is-invalid');
    const div = input.nextElementSibling;
    div.innerHTML = message;
    div.className = 'invalid-feedback cap';
}

function checkRequired(input) {
    if (input.value === '') {
        error(input, `${input.id} is required!`);
    }
    else {
        sucess(input);
    }
}

function validateEmail(input) {
    if (input.value === '')
        return;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(input.value).toLowerCase())) {
        error(input, `Please enter a valid ${input.id}!`);
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} should be greater than ${min} characters!`);
    }
    else if (input.value.length > max) {
        error(input, `${input.id} should be less than ${max} characters!`);
    }
    else {
        sucess(input);
    }
}

function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        error(input2, `Passwords are not matching each other!`);
    }
    else {
        sucess(input2);
    }
}

