const formatRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateInput = document.getElementById("date");
const calcBtn = document.getElementById("calc-btn");
const outP = document.getElementById("calc-output");
const outputCont = document.getElementById('output-container');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

calcBtn.addEventListener('click', async function() {
    outputCont.style.height = "50px";
    if (!dateInput.value.match(formatRegex)) {
        outP.innerText = "Please enter a date in the format yyyy-mm-dd!";
        return;
    }

    const dateObj = new Date(dateInput.value);
    const today = new Date();

    if (isNaN(Date.parse(dateObj))) {
        outP.innerText = "Please enter a real date!";
        return;
    }

    if (Date.parse(dateObj) > Date.parse(today)) {
        outP.innerText = "Please enter a date in the past!";
        return;
    }

    outputCont.style.height = "100px";
    await sleep(125);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const epochMs = new Date(Date.now() - dateObj);

    let nextBirthday = new Date(`${today.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate() + 1}`);

    if (dateObj.getUTCMonth() < today.getUTCMonth() && dateObj.getUTCDate() < today.getUTCDate())
        nextBirthday = new Date(`${today.getUTCFullYear() + 1}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate() + 1}`);

    const birthdayEpochMS = new Date(nextBirthday - Date.now());

    outP.innerText = `${days[dateObj.getUTCDay()]} ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()} ${dateObj.getUTCFullYear()}\n`;
    outP.innerText += `You are ${epochMs.getUTCFullYear() - 1970} year(s) old\n`;
    outP.innerText += `You are ${Math.floor(epochMs / 8.64e+7)} day(s) old\n`;
    outP.innerText += `${Math.floor(birthdayEpochMS / 8.64e+7)} day(s) until your birthday\n`;


});
