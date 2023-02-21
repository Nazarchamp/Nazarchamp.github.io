const modalBtn = document.getElementById('modal-btn');
const editBtn = document.getElementById('edit-btn')

const timeInp = document.getElementById('time');

const loginBtn = document.getElementById('login');
const closeLogin = document.getElementById('close-login');

const alarmContainer = document.getElementById('alarm-container');
const alarmText = document.getElementById('alarm-text');

const errorP = document.getElementById('error-p');

const overlay = document.getElementById('overlay');

const time = "";

overlay.style.display = "none";

closeLogin.addEventListener('click', ()=>{
    overlay.style.display = "none";
    errorP.innerText = "";
    timeInp.value = "";
});

loginBtn.addEventListener('click', () => {
    let errorText = "";

    const regexTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if(timeInp.value.length !== 5 || !timeInp.value.match(":")){
        errorText += "Enter time as HH:MM";
        errorP.style.display= "block";
        errorP.innerText = errorText;
    }
    else if(timeInp.value.match(regexTime)){
        overlay.style.display = "none";
        errorP.innerText = "";
        alarmText.innerText = timeInp.value;
        alarmH = timeInp.value.split(":")[0];
        alarmM = timeInp.value.split(":")[1];
        timeInp.value = "";
        alarmContainer.style.display = "flex";
        modalBtn.style.display = "none";

    }else{
        errorText += "Enter a valid time";
        errorP.style.display= "block";
        errorP.innerText = errorText;
    }
});


modalBtn.addEventListener('click', ()=>{
    overlay.style.display = "flex";
});

editBtn.addEventListener('click', ()=>{
    overlay.style.display = "flex";
});