const inputs = document.getElementsByClassName('input');
const checkboxes = document.getElementsByClassName('checkbox');

const inputsArr = Array.from(inputs);
const checkboxesArr = Array.from(checkboxes);

//Задание 1

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

saveInCookies = (e) => {
    e.preventDefault()
    inputsArr.forEach(input => {
        setCookie(input.name, input.value)
    });
    checkboxesArr.forEach(checkbox => {
        if (checkbox.checked) {
            setCookie(checkbox.name, 'checked')
        }
        else {
            setCookie(checkbox.name, '')
        }
    });
}
/* Функция для восстановления данных пользователя, используя куки
document.addEventListener("DOMContentLoaded", () => {
    inputsArr.forEach(input => {
        if(getCookie(input.name)){
            input.value = getCookie(input.name);
        }
    })
    checkboxesArr.forEach(checkbox =>{
        checkbox.checked = getCookie(checkbox.name)
    } )
});
*/

//Задание 2

saveInLocalStorage = (e) => {
    e.preventDefault()
    let saved = {}
    inputsArr.forEach(input => {
        saved = {
            ...saved,
            [input.name]: input.value
        }
    })

    checkboxesArr.forEach(checkbox => {
        if (checkbox.checked) {
            saved = {
                ...saved,
                [checkbox.name]: 'checked'
            }
        } else {
            saved = {
                ...saved,
                [checkbox.name]: ''
            }
        }
    })
    localStorage.data = JSON.stringify(saved);
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.data){
        let data = JSON.parse( localStorage.data)
        inputsArr.forEach(input => {
            input.value = data[input.name];
        })
        checkboxesArr.forEach(checkbox =>{
            checkbox.checked = data[checkbox.name]
        })
    }
});