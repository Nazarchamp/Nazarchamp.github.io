"use strict";

class Shape{
    constructor(shape, color) {
        this._shape = shape;
        this._color = color;
    }

    get color(){
        return this._color;
    }

    set color(val){
        this._color = val;
    }

    get shape(){
        return this._shape;
    }

    set shape(val){
        this._shape = val;
    }

    info(){
        return `${this._color.charAt(0).toUpperCase() + this._color.slice(1)} ${this._shape.charAt(0).toUpperCase() + this._shape.slice(1)}`;
    }
}

const colourMap = {
    blue: "#0f9",
    green: "#9f0",
    orange: "#f90",
    pink: "#f09",
    purple: "#90f"
};

let count = 0;

const colorSelect = document.getElementById("color-type");
const shapeSelect = document.getElementById("shape-type");

const createBtn = document.getElementById("create-btn");

const shapeGrid = document.getElementById("shape-grid");

const infoText = document.getElementById("shape-info");

const shapes = [];

createBtn.addEventListener('click', () => {
    if(count >= 24)
        return;

    count += 1;

    let newElement = document.createElement("div");

    shapes.push(new Shape(shapeSelect.value.toLowerCase(), colorSelect.value.toLowerCase()));

    newElement.setAttribute('shapeOrder', count);

    newElement.classList.add("shape");
    newElement.classList.add(shapeSelect.value.toLowerCase());
    newElement.style.backgroundColor = colourMap[colorSelect.value.toLowerCase()];


    newElement.addEventListener('click', (e) => {
        infoText.innerText = shapes[e.target.getAttribute("shapeOrder")-1].info();
    });

    shapeGrid.appendChild(newElement);

});