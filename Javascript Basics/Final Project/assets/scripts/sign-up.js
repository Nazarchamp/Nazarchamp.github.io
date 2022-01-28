const fnameInp = document.getElementById('first-name');
const lnameInp = document.getElementById('last-name');
const passwordInp = document.getElementById('password');
const passwordReInp = document.getElementById('password-re');
const emailInp = document.getElementById('email');

const registerBtn = document.getElementById('register');

const errorP = document.getElementById('error-p');
registerBtn.addEventListener('click', () => {
    let errMsg = "";
    if (fnameInp.value === "")
        errMsg += "First Name Required\n";
    if (lnameInp.value === "")
        errMsg += "Last Name Required\n";
    if (emailInp.value === "") {
        errMsg += "Email Required\n";
    } else {
        if (!emailInp.value.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            errMsg += "Invalid Email Format\n";
        }
    }
    if (passwordInp.value === "") {
        errMsg += "Password Required\n";
    } else if (passwordReInp.value === "") {
        errMsg += "Re-Entering of Password Required\n";
    } else if (passwordInp.value !== passwordReInp.value) {
        errMsg += "Passwords Don't Match";
    }

    if (errMsg !== '') {
        errorP.innerText = errMsg;
        errorP.style.display = 'block';
    }else{
        window.location.href = `index.html`;
    }
});
