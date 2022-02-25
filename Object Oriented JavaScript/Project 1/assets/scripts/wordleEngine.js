const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('g');

let answer = "bloke"

if(gameId !== null){
    const convertedGameId = parseInt(atob(gameId));
    if(typeof convertedGameId === "number" && convertedGameId > -1 && convertedGameId < answerList.length)
        answer = answerList[convertedGameId]
    else
        window.location.href = location.protocol + '//' + location.host + location.pathname + "?g=" + btoa(Math.floor(Math.random()*answerList.length).toString().padStart(6, '0')) ;
}
else
    window.location.href = location.protocol + '//' + location.host + location.pathname + "?g=" + btoa(Math.floor(Math.random()*answerList.length).toString().padStart(6, '0')) ;


let guesses = 0;

/*
1 => too short
0 => word isnt real
*/
const guess = (word) => {
    word = word.toLowerCase();
    if(word.length < 5)
        return 1;
    if(!wordList.includes(word.toUpperCase()))
        return 0;

    word = word.split("");
    let changeableAnswer = answer.split("");

    const returnObj = {
        result: "N/A",
        0: "Grey",
        1: "Grey",
        2: "Grey",
        3: "Grey",
        4: "Grey",
    };

    for(let i = 0; i<5; i++){
        if(word[i] === changeableAnswer[i]){
            changeableAnswer[i] = "#";
            word[i] = "#";
            returnObj[i] = "Green";
        }
    }

    for(let i = 0; i<5; i++){
        const indexOfChar = changeableAnswer.indexOf(word[i]);
        if(word[i] !== "#" && indexOfChar !== -1){
            changeableAnswer[indexOfChar] = "#";
            word[i] = "#";
            returnObj[i] = "Yellow";
        }
    }
 
    guesses += 1;


    let count = 0;
    for(let prop in returnObj){
        if(returnObj[prop] === "Green")
            count += 1
    }

    console.log(count);
    if(count === 5)
        returnObj["result"] = "Win";
    else if(guesses == 6){
        returnObj["result"] = "Loss";
    }

    return returnObj;
}
