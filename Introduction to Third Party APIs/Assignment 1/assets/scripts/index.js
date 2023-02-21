// Get cookie by name with regex
function getCookie(name) {
    let cookieName = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

    let regex = new RegExp(`(?:^|;)\\s?${cookieName}=(.*?)(?:;|$)`, 'i');
    let match = document.cookie.match(regex);

    return match ? decodeURIComponent(match[1]) : null;
}

// set cookie with object parameters
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        sameSite: 'lax',
        // domain: '',
        // secure: false,
        // expires: new Date(Date.now() + 60 * 60 * 1000),
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

// delete cookie by name
function deleteCookie(name) {
    setCookie(name, '', {
        'max-age': -1
    });
}


function saveCookies(isWidth, isHeight, isBrowser, isOS){
    if(isWidth)
        setCookie('width', screen.width);
    else
        deleteCookie('width')

    if(isHeight)
        setCookie('height', screen.height);
    else
        deleteCookie('height');

    if(isBrowser)
        setCookie('browser', navigator.userAgent);
    else
        deleteCookie('browser');

    if(isOS)
        setCookie('os', navigator.platform);
    else
        deleteCookie('os')

    if(!(isWidth || isHeight || isBrowser || isOS)){
        setCookie('rejected', true, {expires: new Date(Date.now() + 15 * 1000)});
    }else{
        deleteCookie('rejected');
    }
}

let initialModal = document.getElementById('accept-modal');
let acceptBtn = document.getElementById('accept-btn');
let openCookies = document.getElementById('cookie-open');
let secondModal = document.getElementById('manage-modal');
let manageBtn = document.getElementById('manage-btn');
let closeSecondModal = document.getElementById('close-manage');

let isWidthSelector = document.getElementById('width-check');
let isHeightSelector = document.getElementById('height-check');
let isBrowserSelector = document.getElementById('browser-check');
let isOSSelector = document.getElementById('os-check');

if (navigator.cookieEnabled && !document.cookie) {
    setTimeout(() => {
        initialModal.showModal();
    }, 1000);
}

acceptBtn.addEventListener('click', () => {
    initialModal.close();
    saveCookies(true, true, true, true);
});

openCookies.addEventListener('click', () => {
    initialModal.showModal();
});

closeSecondModal.addEventListener('click', () => {
    secondModal.close();
    saveCookies(isWidthSelector.checked, isHeightSelector.checked, isBrowserSelector.checked, isOSSelector.checked);
});

manageBtn.addEventListener('click', () => {
    initialModal.close();
    secondModal.showModal();
});

let nums = [5, 6, 34, -5, 0, 9];

// sort nums array
nums.sort((a, b) => {
    return a - b;
});

console.log(nums);
