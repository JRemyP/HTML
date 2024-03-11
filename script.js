
const wantedScreenElements = document.getElementById('wanted-screen');
const moduleElements = document.getElementById('module');
const realScreenElements = document.getElementById('real');
const priceElements = document.getElementById('pricing');

const output = document.getElementById('output');
const buttonValid = document.getElementById('valid');



var wantedScreen = {
    lenghtElement : wantedScreenElements.querySelector('#lenght'),
    widthElement : wantedScreenElements.querySelector('#width'),
    validElement : wantedScreenElements.querySelector('#valid'),
    lenght : 0,
    width : 0,
}

var realScreen = {
    lenght : 0,
    width : 0,
    area : 0,

    xRes: 0,
    yRes: 0,
    totalRes : 0,

    xModule: 0,
    yModule: 0,
    totalModule : 0,

    vpuOutputs : 0,

    widthElement : realScreenElements.querySelector('#width'),
    lenghtElement : realScreenElements.querySelector('#lenght'),
    areaElement : realScreenElements.querySelector('#area'),

    xResElement : realScreenElements.querySelector('#x-res'),
    yResElement : realScreenElements.querySelector('#y-res'),
    totalResElement : realScreenElements.querySelector('#total-res'),

    xModuleElement : realScreenElements.querySelector('#x-module'),
    yModuleElement : realScreenElements.querySelector('#y-module'),
    totalModuleElement : realScreenElements.querySelector('#total-module'),

    vpuOutputsElement : realScreenElements.querySelector('#vpu-outputs'),
}

/* VARIABLES */
var module = {
    x:0,
    y:0,
    p:0,
    width:0,
    lenght:0,
    price: 0,
    widthElement: moduleElements.querySelector('#width'),
    lenghtElement: moduleElements.querySelector('#lenght'),
    pElement: moduleElements.querySelector('#pitch'),
    xElement: moduleElements.querySelector('#x'),
    yElement: moduleElements.querySelector('#y'),
    priceElement: moduleElements.querySelector('#price'),
}

var price = {
    total : 0,
    area : 0,
    totalElement : priceElements.querySelector('#total'),
    areaElement : priceElements.querySelector('#m2'),
}


function displayPitch(){
    HTMLString=`
    <p>Pitch : ${pitchModule.value}</p>
    `
    output.innerHTML = HTMLString;
}

function calculateTotalScreen(){

    module.width = parseInt(module.widthElement.value);
    module.lenght = parseInt(module.lenghtElement.value);
    module.price = module.priceElement.value;

    let pStr = `${module.pElement.value}`;
    pStr = pStr.replace('p','');
    pStr = pStr.slice(0, 1) + "." + pStr.slice(1);
    module.p = parseFloat(pStr);

    if(module.p == 0 || module.lenght == 0 || module.width == 0){
        return ;
    }

    module.x = ~~(module.lenght / module.p);
    module.y = ~~(module.width / module.p);

    module.xElement.innerHTML = module.x;
    module.yElement.innerHTML = module.y;


    wantedScreen.lenght = parseInt(wantedScreen.lenghtElement.value);
    realScreen.xModule = Math.ceil(wantedScreen.lenght / module.lenght);
    realScreen.xModuleElement.innerHTML = realScreen.xModule;

    wantedScreen.width= parseInt(wantedScreen.widthElement.value);
    realScreen.yModule = Math.ceil(wantedScreen.width / module.width);
    realScreen.yModuleElement.innerHTML = realScreen.yModule;

    realScreen.totalModule = realScreen.yModule * realScreen.xModule ;
    realScreen.totalModuleElement.innerHTML = realScreen.totalModule;

    realScreen.lenght = realScreen.xModule * module.lenght;
    realScreen.width = realScreen.yModule * module.width;
    realScreen.widthElement.innerHTML = realScreen.width.toLocaleString();
    realScreen.lenghtElement.innerHTML = realScreen.lenght.toLocaleString();

    realScreen.area = (realScreen.lenght/1000.0) * (realScreen.width/1000.0);
    realScreen.areaElement.innerHTML = realScreen.area.toFixed(3);


    realScreen.xRes = realScreen.xModule * module.x;
    realScreen.yRes = realScreen.yModule * module.y;
    realScreen.xResElement.innerHTML = realScreen.xRes;
    realScreen.yResElement.innerHTML = realScreen.yRes;

    realScreen.totalRes = realScreen.xRes * realScreen.yRes;
    realScreen.totalResElement.innerHTML = realScreen.totalRes.toLocaleString();

    realScreen.vpuOutputs = Math.ceil(realScreen.totalRes / 650000.0);
    realScreen.vpuOutputsElement.innerHTML = realScreen.vpuOutputs;

    price.total = module.price * realScreen.totalModule;
    price.area = price.total / realScreen.area;

    price.totalElement.innerHTML = price.total.toLocaleString() + " €";
    price.areaElement.innerHTML = price.area.toFixed(2) + " €";

}

moduleElements.addEventListener('change', calculateTotalScreen);
wantedScreenElements.addEventListener('change', calculateTotalScreen);
//screenWidth.addEventListener('change', console);