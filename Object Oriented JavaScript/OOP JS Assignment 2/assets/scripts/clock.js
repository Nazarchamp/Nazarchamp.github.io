const clockDisplay = document.getElementById("clock-text");

let alarmH = "-1";
let alarmM = "-1";

const pad = (num) => {
    if(num > 9)
        return num;
    return `0${num}`;
}

let flag = true;

const stop = () =>{
    clockDisplay.style.color = "black";
}

const timeKeep = () => {
    const now = new Date();
    let h = pad(now.getHours());
    let m = pad(now.getMinutes());
    let s = pad(now.getSeconds());


    if(flag && m.toString() === alarmM && h.toString() === alarmH && s === "00"){
        console.log("Playing");
        document.getElementById("music").play();
        clockDisplay.style.color = "green";
        setTimeout(stop, 8000);
        flag = false;
    }else{
        flag = true;
    }

    clockDisplay.innerText = `${h}:${m}:${s}`;

    setTimeout(timeKeep, 1000);
}

timeKeep();