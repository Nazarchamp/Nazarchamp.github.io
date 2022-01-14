"use strict";

const FtoCOutput = document.getElementById("FtoC-output");
const FtoCInput = document.getElementById("FtoC-input");

const CtoFOutput = document.getElementById("CtoF-output");
const CtoFInput = document.getElementById("CtoF-input");


document.getElementById("FtoC-btn").addEventListener('click', () => {
    let val = FtoCInput.value;
    let txt = "Please enter a number!";
    console.log(val);
    if (!isNaN(val) && val)
        txt = `<b>${val}°F</b> is <b>${((val - 32) * 5 / 9).toFixed(1)}°C</b>`;
    FtoCOutput.innerHTML = txt;
});

document.getElementById("CtoF-btn").addEventListener('click', () => {
    let val = CtoFInput.value;
    let txt = "Please enter a number!";
    console.log(val);
    if (!isNaN(val) && val)
        txt = `<b>${val}°C</b> is <b>${((val * 1.8) + 32).toFixed(1)}°F</b>`;
    CtoFOutput.innerHTML = txt;
});

Array.from(document.querySelectorAll("i")).forEach(el => {
    el.addEventListener('click', () => {
        document.querySelector('body').classList.toggle("dark-body")
        Array.from(document.getElementsByClassName("changeHeadings")).forEach(el =>{
            el.classList.toggle("dark-mode-text");
        });
        Array.from(document.getElementsByClassName("output")).forEach(el =>{
            el.classList.toggle("dark-div");
        });
        Array.from(document.getElementsByClassName("converter-input")).forEach(el =>{
            el.classList.toggle("dark-input");
        });
        document.getElementById("mode-change-btn").classList.toggle("fa-moon");
        document.getElementById("mode-change-btn").classList.toggle("fa-sun");
    });
});
