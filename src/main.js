// DOM elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

// Object to hold random functions
const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number : getRandomNumber,
    symbol : getRandomSymbol
};

// Event listener for generate button
generateElement.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumbers = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
});

clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    // alert('Password copied to clipboard');
});


// Generates password based on user input
function generatePassword(lower, upper, number, symbol, length) {
    
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // if nothing is checked return empty string
    if(typesCount === 0) {
        return '';
    }

    // loop over length and call generator function for each type
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    // slice password to desired length
    const finalPassword = generatedPassword.slice(0, length);

    // return password
    return finalPassword;
}

// Generates random lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generates random uppercase letter
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generates random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generates random symbol
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}