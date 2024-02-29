document.writeln("This is a JS code");

const screenlenght = document.getElementById('lenght-screen');
const screenWidth = document.getElementById('width-screen');
const buttonValid = document.getElementById('valid');
const pitchModule = document.getElementById('pitch-module');
const widthModule = document.getElementById('width-module');
const lenghtModule = document.getElementById('lenght-module');

const xModule = document.getElementById('x-module');
const yModule = document.getElementById('y-module');

const output = document.getElementById('output');


/* VARIABLES */
var module = {
    x:0,
    y:0,
    width:0,
    lenght:0,
    p:0
}

var screen = {
    x:0,
    y:0,
    width:0,
    lenght:0,
    p:0.0
}

function displayValue(){
    let i = parseInt(screenWidth.value);
    HTMLString=`
    <p>Width : ${i}</p>
    `
    output.innerHTML = HTMLString;
}

function displayQtyPixels(){

    module.width = parseInt(widthModule.value);
    module.lenght = parseInt(lenghtModule.value);
    let pStr = `${pitchModule.value}`;
    pStr = pStr.replace('p','');
    pStr = pStr.slice(0, 1) + "." + pStr.slice(1);
    module.p = parseFloat(pStr);

    module.x = ~~(module.width / module.p);
    module.y = ~~(module.lenght / module.p);

    xModule.innerHTML = module.x;
    yModule.innerHTML = module.y;

}

function displayPitch(){
    HTMLString=`
    <p>Pitch : ${pitchModule.value}</p>
    `
    output.innerHTML = HTMLString;
}

screenWidth.addEventListener('change', displayValue);

pitchModule.addEventListener('change', displayQtyPixels);
widthModule.addEventListener('change', displayQtyPixels);
lenghtModule.addEventListener('change', displayQtyPixels);