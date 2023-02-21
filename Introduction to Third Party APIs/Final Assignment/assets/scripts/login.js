const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberInput = document.getElementById('remember');
const errorText = document.getElementById('error');

const username = "movielover@gmail.com";
const password = "password";

const loginForm = document.getElementById('login-form');

emailInput.value = localStorage.getItem('email');
passwordInput.value = localStorage.getItem('password');
rememberInput.checked = localStorage.getItem('remember') === 'true';

if(localStorage.getItem('isFailedLogin')){
    errorText.style.visibility = 'visible';
    localStorage.removeItem('isFailedLogin');
}
else if((localStorage.getItem('remember') === 'true' && emailInput.value === username && passwordInput.value === password) || localStorage.getItem('isLoggingIn'))
    window.location.replace('index.html');

loginForm.addEventListener('submit', ()=>{
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('password', passwordInput.value);
    localStorage.setItem('remember', rememberInput.checked);

    if(!(emailInput.value === username && passwordInput.value === password)){
        localStorage.setItem('isFailedLogin', "true");
        return;
    }

    if(!rememberInput.checked){
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('remember');
    }

    localStorage.setItem('isLoggingIn', "true");
});