const loginBtn = document.getElementById('login');
const signUpBtn = document.getElementById('sign-up');
const usernameInp = document.getElementById('username');
const passwordInp = document.getElementById('password');

const loginAnchor = document.getElementById('loginAnchor');
const closeLogin = document.getElementById('close-login');


const errorP = document.getElementById('error-p');

const overlay = document.getElementById('overlay');


overlay.style.display = "none";
googleBtn.disabled = true;
bingBtn.disabled = true;

closeLogin.addEventListener('click', ()=>{
   overlay.style.display = "none";
});

loginBtn.addEventListener('click', ()=>{
    let errorText = "";
    if(usernameInp.value === ""){
        errorText += "Username missing\n";
    }
    if(passwordInp.value === ""){
        errorText += "Password missing\n";
    }

    if(errorText === "") {
        if (usernameInp.value === "admin" && passwordInp.value === "password") {
            googleBtn.disabled = false;
            bingBtn.disabled = false;
            overlay.style.display = "none";
            loginAnchor.style.pointerEvents = "none";
            signUpBtn.style.display = "none";
            loginAnchor.innerText = "Logged In";
        } else {
            errorP.style.display="block";
            errorP.innerText = "Invalid Login Credentials";
        }
    }else{
        errorP.style.display= "block";
        errorP.innerText = errorText;
    }
});

loginAnchor.addEventListener('click', ()=>{
   overlay.style.display = "flex";
});