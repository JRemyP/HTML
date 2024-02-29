document.writeln("This is a JS code");

const screenLength = document.getElementById('lenght-screen');
const screenWidth = document.getElementById('width-screen');
const buttonValid = document.getElementById('valid');
const pitchModule = document.getElementById('pitch-module');

const output = document.getElementById('output');


function displayValue(){
    let i = parseInt(screenWidth.value);
    HTMLString=`
    <p>Width : ${i}</p>
    `
    output.innerHTML = HTMLString;
}


function displayPitch(){
    HTMLString=`
    <p>Pitch : ${pitchModule.value}</p>
    `
    output.innerHTML = HTMLString;
}

screenWidth.addEventListener('change', displayValue);
buttonValid.addEventListener('click', displayPitch);
