const input = document.getElementById('original');
const buttonUse = document.getElementById('use');
const buttonEncrypt = document.getElementById('encrypt');
const buttonDecrypt = document.getElementById('decrypt');
const resultBox = document.getElementById('content');
const errorBox = document.getElementById('error');

const codes = { a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat' };

function showError(message) {
    buttonEncrypt.disabled = true;
    buttonDecrypt.disabled = true;

    errorBox.classList.add('show');
    errorBox.innerHTML = message;
    
    setTimeout(() => {
        errorBox.innerHTML = '';
        errorBox.classList.remove('show');
        buttonEncrypt.disabled = false;
        buttonDecrypt.disabled = false;
    }, 3000);
}

function getCode(part, toEncrypt) {
    const lower = part.toLowerCase();

    if (toEncrypt) {
        const code = codes[lower];
        if (!code) return lower;
        
        return code;
    } else {
        const vowel = Object.keys(codes).find(key => codes[key] === lower);
        if (!vowel) return lower;

        return vowel;
    }
}

function checkValue(value) {
    const status = { valid: true };
    const onlyLettersRegex = new RegExp(/^[a-zA-Z]+$/);

    if (!value) {
        status['valid'] = false;
        status['message'] = 'O campo é obrigatório';

        return status;
    }

    if (!onlyLettersRegex.test(value)) {
        status['valid'] = false;
        status['message'] = 'Informe apenas letras não acentuadas';
        
        return status;
    }

    return status;
}

function encrypt() {
    const value = input.value;
    const validation = checkValue(value);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    const splitted = value.split('');
    const result = splitted.map(value => getCode(value, true)).join('');

    resultBox.innerHTML = result;
    input.value = '';
}

function decrypt() {
    const value = input.value;
    const validation = checkValue(value);

    if (!validation.valid) {
        showError(validation.message);
        return;
    }
    
    const codesRegex = new RegExp(`(${Object.values(codes).join('|')})`, 'gi');

    const splitted = value.split(codesRegex);
    const result = splitted.filter(value => value).map(value => getCode(value, false)).join('');

    resultBox.innerHTML = result;
    input.value = '';
}

function useValue() {
    const currentValue = resultBox.innerHTML;

    if (!currentValue) return;

    input.value = currentValue;
    resultBox.innerHTML = '';
}

buttonUse.addEventListener('click', useValue);
buttonEncrypt.addEventListener('click', encrypt);
buttonDecrypt.addEventListener('click', decrypt);
