const pitchSelectElement = document.getElementById('pitch-select');
const sizeSelectElement = document.getElementById('size-select');
const infosModuleElement = document.getElementById('infos-module');
const infosScreenElement = document.getElementById('real');
const lengthInputElement = document.getElementById('length');
const widthInputElement = document.getElementById('width');
const pricingInputElement = document.getElementById('pricing');

const moduleData = [
    { 
        pitchName : "P1.25",
        pitch : 1.25,
        size : [
            {length : 320, width : 160, x : 256, y : 128, price : 75},
            {length : 240, width : 120, x : 192, y : 96, price : 55},
        ]      
    },
    { 
        pitchName : "P1.29",
        pitch : 1.29,
        size : [
            {length : 320, width : 160, x : 248, y : 124, price : 75},
        ]      
    },
    { 
        pitchName : "P1.53", 
        pitch : 1.538461538461538,
        size : [
            {length : 320, width : 160, x : 120, y : 100, price : 55},
            {length : 240, width : 120, x : 100, y : 80, price : 65},
        ]      
    },
    { 
        pitchName : "P1.56", 
        pitch : 1.56,
        size : [
            {length : 320, width : 160, x : 204, y : 102, price : 58},
        ]      
    },
    { 
        pitchName : "P1.579", 
        pitch : 1.579,
        size : [
            {length : 320, width : 160, x : 152, y : 76, price : 85},
        ]      
    },
    { 
        pitchName : "P1.667", 
        pitch : 1.6666666666666667,
        size : [
            {length : 240, width : 120, x : 144, y : 72, price : 54},
        ]      
    },
    { 
        pitchName : "P2.00", 
        pitch : 2.0,
        size : [
            {length : 360, width : 160, x : 160, y : 80, price : 55},
            {length : 240, width : 120, x : 120, y : 60, price : 65},
        ]      
    },
    { 
        pitchName : "P2.50", 
        pitch : 2.50,
        size : [
            {length : 320, width : 160, x : 128, y : 64, price : 55},
            {length : 240, width : 120, x : 96, y : 48, price : 65},
        ]      
    },
    { 
        pitchName : "P3.00", 
        pitch : 3.00,
        size : [
            {length : 320, width : 160, x : 104, y : 52, price : 55},
            {length : 240, width : 120, x : 80, y : 40, price : 65},
        ]      
    },
    { 
        pitchName : "P4.00", 
        pitch : 4.00,
        size : [
            {length : 320, width : 160, x : 80, y : 40, price : 55},
            {length : 240, width : 120, x : 60, y : 30, price : 65},
        ]      
    },
    { 
        pitchName : "P5.00", 
        pitch : 5.00,
        size : [
            {length : 320, width : 160, x : 64, y : 32, price : 55},
        ]
    }
];

const setPitchSelectOption = () => {
    pitchSelectElement.innerHTML = moduleData.map( e => {
        return `<option value="${e.pitch}">${e.pitchName}</option>`;
    }).join('');
};

const setModuleSelectOption = (currentModule) => {
    sizeSelectElement.innerHTML = currentModule.size.map( e => {
        return `<option value="${e.length}">${e.length} x ${e.width}</option><p>mm</p>`;
    }).join('');
}

const displayInfosModule = (currentSizeModule) => {
    infosModuleElement.innerHTML = `
    <p>X : ${currentSizeModule.x}</p>
    <p>Y : ${currentSizeModule.y}</p>
    <p>Price : ${currentSizeModule.price} €</p>
    `;
};

const displayInfosScreen = () => {

displayInfosModule(moduleData[pitchSelectElement.selectedIndex].size[sizeSelectElement.selectedIndex]);

const currentPitch = pitchSelectElement.selectedIndex;
const currentSize = sizeSelectElement.selectedIndex;

const lengthInput = parseInt(lengthInputElement.value);
const widthInput = parseInt(widthInputElement.value);

const xModuleQty = Math.ceil(lengthInput / moduleData[currentPitch].size[currentSize].length);
const yModuleQty = Math.ceil(widthInput / moduleData[currentPitch].size[currentSize].width);
const totalModuleQty = xModuleQty * yModuleQty;

const lengthReal = xModuleQty * moduleData[currentPitch].size[currentSize].length;
const widthReal = yModuleQty * moduleData[currentPitch].size[currentSize].width;
const area = (lengthReal/1000.0) * (widthReal/1000.0);

const xRes = xModuleQty * moduleData[currentPitch].size[currentSize].x;
const yRes = yModuleQty * moduleData[currentPitch].size[currentSize].y;
const totalRes = xRes * yRes;

const vpuOutputs = Math.ceil(totalRes / 650000.0);

const totalPrice = moduleData[currentPitch].size[currentSize].price * totalModuleQty;
const areaPrice =  totalPrice / area;


const vignettesInfos = [
    `<h2>Dimensions</h2>
    <p>length : ${lengthReal.toLocaleString()} mm</p>
    <p>width : ${widthReal.toLocaleString()} mm</p>
    <p>Area : ${area.toFixed(2)} m²</p>
    `,
    `<h2>Resolution</h2>
    <p>X : ${xRes} px</p>
    <p>Y : ${yRes} px</p>
    <p>Total : ${totalRes.toLocaleString()} px</p>
    `,
    `<h2>Module quantity</h2>
    <p>X : ${xModuleQty}</p>
    <p>Y : ${yModuleQty}</p>
    <p>Total : ${totalModuleQty}</p>
    `,
    `<h2>VPU dimensions</h2>
    <p>outputs RJ45 quantity : ${vpuOutputs}</p>`
   ];

   infosScreenElement.innerHTML = '<legend>Real Screen</legend>';
   infosScreenElement.innerHTML += vignettesInfos.map( (el) => '<div class="vignette">'+el+'</div>');

   pricingInputElement.innerHTML =`
   <legend>Pricing</legend>
   <p>Total : ${totalPrice.toLocaleString()} €</p>
   <p>By m² : ${areaPrice.toFixed(2)} €</p>
   `;
};

setPitchSelectOption();
setModuleSelectOption(moduleData[0]);
displayInfosScreen();

pitchSelectElement.addEventListener('change', () =>  setModuleSelectOption(moduleData[pitchSelectElement.selectedIndex]) );
pitchSelectElement.addEventListener('change', displayInfosScreen);
sizeSelectElement.addEventListener('change', displayInfosScreen);
lengthInputElement.addEventListener('change', displayInfosScreen);
widthInputElement.addEventListener('change', displayInfosScreen);