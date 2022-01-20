"use strict";

const numMap = {dot: ".", one: "1", two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', zero: '0'};
const opMap = {multiply: "×", divide: "÷", plus: "+", minus: "-", equals: "=", clear: "c", 'all-clear': 'ac'};

const shortMemOut = document.getElementById("short-mem-output");
const longMemOut = document.getElementById("long-mem-output");

const clearBtn = document.getElementById('clear-button');

let isShortMemCycle = true;
let isLongMemCycle = false;

let longMem = [];
let shortMem = "0";

Array.from(document.getElementsByClassName('white-button')).forEach(el =>{
   el.addEventListener('click',() => {
      let numVal = numMap[el.classList.item(3)];
      if(isLongMemCycle){
         longMem = [];
         longMemOut.innerHTML = "&nbsp;";
         isLongMemCycle = false;
         shortMem = "";
         isShortMemCycle = false;
      }
      else if(isShortMemCycle || shortMem === '0'){
         if('0' === numVal && shortMem === '0'){
            return;
         }
         shortMem = ""
         isShortMemCycle = false;
      }

      if(shortMem === "" && numVal==="."){
         numVal = "0."
      }

      if(shortMem.indexOf('.') !== -1 && numVal==="."){
         return;
      }

      if(clearBtn.classList.contains('all-clear') && longMem.length > 0){
         clearBtn.classList.toggle('clear');
         clearBtn.classList.toggle('all-clear');
      }

      shortMem += numVal;
      if(shortMem.length > 8){
         shortMemOut.innerText = shortMem.slice(shortMem.length-8);
      }else{
         shortMemOut.innerText = shortMem;
      }

   });
});

Array.from(document.getElementsByClassName('purple-button')).forEach(el =>{
   el.addEventListener('click',() => {
      let opVal = opMap[el.classList.item(3)];
      if(isLongMemCycle) {
         longMem = [];
         isLongMemCycle = false;
         if(opVal === 'c'){
            longMem = [];
            longMemOut.innerHTML = "&nbsp;";
            isLongMemCycle = false;
         }
      }
      if(opVal === 'c'){
         isShortMemCycle = true;
         shortMem = "0";
         shortMemOut.innerText = shortMem;
         clearBtn.classList.toggle('clear');
         clearBtn.classList.toggle('all-clear');
         return;
      }

      if(opVal === 'ac'){
         longMem = [];
         longMemOut.innerHTML = "&nbsp;";
         isLongMemCycle = false;
         isShortMemCycle = true;
         shortMem = "0";
         shortMemOut.innerText = shortMem;
         return;
      }

      if(clearBtn.classList.contains('all-clear')){
         clearBtn.classList.toggle('clear');
         clearBtn.classList.toggle('all-clear');
      }

      longMem.push(shortMem);
      longMem.push(opVal);
      isShortMemCycle = true;
      if(longMem.join(" ").length > 35){
         longMemOut.innerText = longMem.join(" ").slice(longMem.join(" ").length-35);
      }else{
         longMemOut.innerText = longMem.join(" ");
      }

      if(opVal === "="){
         evaluate();
      }
   });
});

function evaluate(){
   let expression = longMem.slice(0, longMem.length-1).join(" ")
   expression = expression.replaceAll('÷', '/');
   expression = expression.replaceAll('×', '*');
   console.log(expression);
   let result = eval(expression);
   shortMem = result.toString();
   if((shortMem.length > 8 && (shortMem.indexOf('.') === -1 || shortMem.indexOf('.') > 6)) || shortMem === "NaN"){
      shortMem = 'Math Err';
      isShortMemCycle = true;
      shortMemOut.innerText = shortMem;
      shortMem = '0'
   }else{
      shortMem = parseFloat(shortMem.slice(0, 8)).toString()
      shortMemOut.innerText = shortMem;
   }
   isLongMemCycle = true;
   if(clearBtn.classList.contains('clear')){
      clearBtn.classList.toggle('clear');
      clearBtn.classList.toggle('all-clear');
   }
}
