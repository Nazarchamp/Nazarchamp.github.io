const keyboardBtns = document.getElementsByClassName("keyboard-button");

const gameRows = document.getElementsByClassName("row");

const backBtn = document.getElementById("back-btn");

const enterBtn = document.getElementById("enter-btn");

const errorMsg = document.getElementById("error-msg");

const closeHelp = document.getElementById("close-help");

const canvasCover = document.getElementById("canvas-cover");
const helpModal = document.getElementById("help-modal");
const winModal = document.getElementById("win-modal");
const scoresModal = document.getElementById("high-score-modal");
const announcement = document.getElementById("announcement");

const gamesContainer = document.getElementById("games-container");

const playAgain = document.getElementById("play-again");

const musicPlayer = document.getElementById("music-player");
const soundPlayer = document.getElementById("sound-player");

const resultWords = {
    1: "Genius",
    2: "Impressive",
    3: "Nice",
    4: "Splendid",
    5: "Close One",
    6: "Phew"
}

let strToWrite = "";
let curRowOn = 0;

const displayErrorMsg = (msg) => {
    errorMsg.innerText = msg;
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("visible");
    setTimeout(() => {  errorMsg.classList.remove("visible");
    errorMsg.classList.add("hidden"); }, 1250);
}

playAgain.addEventListener('click', () => {
    window.location.href = location.protocol + '//' + location.host + location.pathname + "?g=" + btoa(Math.floor(Math.random()*answerList.length).toString().padStart(6, '0')) ;
});

closeHelp.addEventListener('click', () =>{
    helpModal.style.display = "none";
    canvasCover.style.display = "none";
    musicPlayer.loop = true;
    musicPlayer.volume = 0.05;
    musicPlayer.play();
});

backBtn.addEventListener('click', () =>{
    if(strToWrite.length > 0)
        strToWrite = strToWrite.slice(0, -1);
        updateRow();
});

enterBtn.addEventListener('click', () =>{
    let guessResult = guess(strToWrite);
    if(guessResult === 0){
        displayErrorMsg("Not in word list");
    }     
    else if(guessResult === 1)
        displayErrorMsg("Not enough letters");
    else{
        let tiles = gameRows[curRowOn].getElementsByClassName("tile");

        let letterMap = {}

        for(let i = 0; i < 5; i++){
            tiles[i].classList.add(guessResult[i]);
            if(guessResult[i] === "Green")
                letterMap[strToWrite[i]] = "Green";
            else if(guessResult[i] === "Yellow" && letterMap[strToWrite[i]] !== "Green")
                letterMap[strToWrite[i]] = "Yellow";
            else if(!(strToWrite[i] in letterMap))
                letterMap[strToWrite[i]] = "Grey";
        }

        Array.from(keyboardBtns).forEach(el => {
            if(el.innerText in letterMap)
            {
                el.classList.remove("Grey");
                el.classList.remove("Yellow");
                el.classList.add(letterMap[el.innerText]);
            }
        });

        curRowOn += 1;
        strToWrite = "";
        if(guessResult.result === "Win"){
            soundPlayer.src = "assets/media/win.wav";
            soundPlayer.play();
            displayErrorMsg(resultWords[curRowOn]);
            setTimeout(()=>{
                announcement.innerHTML = "<b>🎉Congratulations!🎉</b>";
                winModal.style.display = "block";
                scoresModal.style.display = "block";
                canvasCover.style.display = "block";
                updateHighScores();
            }, 2000);

            let wins = localStorage.getItem("wins");

            let winObject = {
                word: answer.slice(0,1).toUpperCase() + answer.slice(1),
                guesses: curRowOn,
                day: new Date().toLocaleDateString()
            };

            if(wins){
                let parsedWins = [...JSON.parse(wins)];
                parsedWins.push(winObject);
                localStorage.setItem("wins", JSON.stringify(parsedWins));
            }else{
                localStorage.setItem("wins", JSON.stringify([winObject]));
            }

        }else if(guessResult.result === "Loss"){
            soundPlayer.src = "assets/media/lose.wav";
            soundPlayer.play();
            errorMsg.innerText = answer.slice(0,1).toUpperCase() + answer.slice(1);
            errorMsg.classList.remove("hidden");
            errorMsg.classList.add("visible");
            setTimeout(()=>{
                announcement.innerHTML = "<b>😢Nice Try😢</b>";
                winModal.style.display = "block";
                scoresModal.style.display = "block";
                canvasCover.style.display = "block";
                updateHighScores();
            }, 2000);
        }
        console.log(guessResult);
    }
});

Array.from(keyboardBtns).forEach(el => {
    el.addEventListener('click', (e) => {
        if(strToWrite.length < 5)
            strToWrite += e.target.innerText;
            updateRow();

    });
});

const updateRow = () => {
    let tiles = gameRows[curRowOn].getElementsByClassName("tile");

    for(let i = 0; i < strToWrite.length; i++){
        tiles[i].innerHTML = strToWrite[i];
    }

    for(let i = strToWrite.length; i < 5; i++){
        tiles[i].innerHTML = "";
    }
}

document.addEventListener('keyup', (event) => {
    if(canvasCover.style.display !== "none")
        return;
    console.log(event.key);
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) { // if a letter pressed
        if(strToWrite.length < 5)
        strToWrite += String.fromCharCode(event.keyCode).toUpperCase();
        updateRow();
    }
    if(event.key === "Backspace")
        strToWrite = strToWrite.slice(0, -1);
        updateRow();
    if(event.key === "Enter")
        enterBtn.click();
  });

const updateHighScores = () => {
    let gameList = [...JSON.parse(localStorage.getItem("wins"))];
    gameList.sort((a, b) => {
        return a.guesses - b.guesses;
    });
    gamesContainer.innerHTML = "";

    for(let game of gameList){
        let gameDiv = document.createElement("div");
        gameDiv.classList.add("table-row");

        gameDiv.innerHTML = `
            <div class="third">${game.word}</div>
            <div class="third">${game.guesses}</div>
            <div class="third">${game.day}</div>
        `;

        gamesContainer.appendChild(gameDiv);
    }
}