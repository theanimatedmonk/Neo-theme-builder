const themeBuilder = document.getElementById("theme-builder");
const colorCalculator = document.getElementById("color-calculator");
const output = document.querySelector(".output");
const template = document.querySelector(".template");
const colorPicker = document.getElementById("color-picker");
const errorMessage = document.getElementById("error");


// For the template
const intro = document.getElementById("intro");
const links = document.getElementById("links");
const youtube = document.getElementById("youtube");
const btns = document.querySelectorAll(".button");
const texts = document.querySelectorAll("span");

//option buttons
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

// For the template colors
const primaryColor = document.querySelector("#primary-color");
const primaryTonalLightColor = document.querySelector("#primary-tonal-light-color");
const tonalDarkColor = document.querySelector("#tonal-dark-color");

const complementaryColor = document.querySelector("#complementary-color"); //complementary
const complementaryTonalLightColor = document.querySelector("#complementary-tonal-light-color");

const triadicColor1 = document.querySelector("#triadic-color-1"); //triadic colors
const triadicColor2 = document.querySelector("#triadic-color-2"); 

const triadicTonalLightColor1 = document.querySelector("#triadic-tonal-light-color-1");
const triadicTonalLightColor2 = document.querySelector("#triadic-tonal-light-color-2");


const tetradicColor1 = document.querySelector("#tetradic-color-1"); //tetradic colors
const tetradicColor2 = document.querySelector("#tetradic-color-2"); 
const tetradicColor3 = document.querySelector("#tetradic-color-3"); 

const tetradicTonalLightColor1 = document.querySelector("#tetradic-tonal-light-color-1");
const tetradicTonalLightColor2 = document.querySelector("#tetradic-tonal-light-color-2");
const tetradicTonalLightColor3 = document.querySelector("#tetradic-tonal-light-color-3");

const typography = document.querySelector("#typography");


// rgb to HEX code conversion
function rgbToHex(r,g,b) {
    // Ensure the values are within the 0-255 range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    
    // Convert each component to a two-digit hexadecimal value
    const redHex = r.toString(16).padStart(2, '0');
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');
    
    // Combine all three hexadecimal values into one string
    return `#${redHex}${greenHex}${blueHex}`;
}

// rgb to HSV code conversion
function rgbToHsv(r, g, b) {
    // Normalize RGB values to range [0, 1]
    r /= 255;
    g /= 255;
    b /= 255;

    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const delta = M - m;

    let h, s, v;

    // Compute Hue
    if (delta === 0) {
        h = 0; // Undefined, achromatic (gray)
    } else if (M === r) {
        h = ((g - b) / delta) % 6;  //if red is dominant then the difference between the green and blue channels determines the position within the red sector.
    } else if (M === g) {
        h = (b - r) / delta + 2;
    } else if (M === b) {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60); // Convert to degrees
    if (h < 0) h += 360;

    // Compute Saturation
    s = M === 0 ? 0 : delta / M;

    // Compute Value
    v = M;

    return {
        h: h, // Hue in degrees
        s: s, // Saturation as a decimal [0, 1]
        v: v  // Value as a decimal [0, 1]
    };
}

function hsvToRgb(h, s, v) {
    let r, g, b;

    // Calculate sector
    let sector = Math.floor(h / 60);
    let f = (h / 60) - sector;

    // Intermediate values
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    // Assign RGB values based on the sector
    switch (sector) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }

    // Convert to 0–255 range
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}



// Helper functions to generate pallet color from input color
function primary(r, g, b) { //for primary color
    return {
        r: r, g: g, b: b
    };
}

function complementary(r, g, b) { //for complementary color
    return {
        r: 255-r, g: 255-g, b: 255-b
    };
}

function primaryTonalLight(r, g, b) { //for primaryTonalLight color
    return {
        r: Math.floor((255 * 6 + r) / 7), 
        g: Math.floor((255 * 6 + g) / 7), 
        b: Math.floor((255 * 6 + b) / 7)
    };
}

function complementrayTonalLight(r, g, b) { //for complementrayTonalLight color
    return {
        r: Math.floor((255 * 6 + (255 - r)) / 7),
        g: Math.floor((255 * 6 + (255 - g)) / 7), 
        b: Math.floor((255 * 6 + (255 - b)) / 7)
    };
}

function typographyColor(r, g, b) {
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    return brightness > 186 ? '#333333' : '#ffffff';
}


function getTriadicColors(h, s, v) { //for triadic colors
    // Ensure hue is within [0, 360]
    let h1 = (h + 120) % 360;
    let h2 = (h + 240) % 360;

    return [
        { h:h, s:s, v:v},
        { h: h1, s: s, v: v },
        { h: h2, s: s, v: v }
    ];
}

function getTetradicColors(h, s, v) { //for tetradic colors
    // Ensure hue is within [0, 360]
    let h1 = (h + 90) % 360;
    let h2 = (h + 180) % 360;
    let h3 = (h + 270) % 360;

    return [
        { h:h, s:s, v:v},
        { h: h1, s: s, v: v },
        { h: h2, s: s, v: v },
        { h: h3, s: s, v: v }
    ];
}


let primaryShade;
let letprimaryTonalLightShade;

let complementaryShade;
let complementaryTonalLightShade;

let triadicShade1;
let triadicShade2;
let triadicLightShade1;
let triadicLightShade2;

let tetradicShade1;
let tetradicShade2;
let tetradicShade3; 
let tetradicLightShade1;
let tetradicLightShade2;
let tetradicLightShade3;

function calculateColors(e) {
    e.preventDefault();

    // Extract the RGB values from the color picker
    const color = colorPicker.value;
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);


    //monotonic colors
    primaryShade = primary(red, green, blue);
    primaryTonalLightShade = primaryTonalLight(red, green, blue);

    primaryColor.style.backgroundColor = `${rgbToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;
    primaryColor.innerHTML = `<div class="text-pill"><b>${rgbToHex(primaryShade.r, primaryShade.g, primaryShade.b)}</b></div>`;

    primaryTonalLightColor.style.backgroundColor = `${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;
    primaryTonalLightColor.innerHTML = `<div class="text-pill"><b>${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}</b></div>`;

    //complementray colors
    complementaryShade = complementary(red, green, blue);
    complementaryTonalLightShade = complementrayTonalLight(red, green, blue);

    complementaryColor.style.backgroundColor = `${rgbToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}`;
    complementaryColor.innerHTML = `<div class="text-pill"><b>${rgbToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}</b></div>`;

    complementaryTonalLightColor.style.backgroundColor = `${rgbToHex(complementaryTonalLightShade.r, complementaryTonalLightShade.g, complementaryTonalLightShade.b)}`;
    complementaryTonalLightColor.innerHTML = `<div class="text-pill"><b>${rgbToHex(complementaryTonalLightShade.r, complementaryTonalLightShade.g, complementaryTonalLightShade.b)}</b></div>`;

    //typography color
    typography.style.backgroundColor = `${typographyColor(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;
    typography.innerHTML = `<div class="text-pill"><b>${typographyColor(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}</b></div>`;


    const hsvPrimary = rgbToHsv(red, green, blue);

    //triadic colors
    const triadicColors = getTriadicColors(hsvPrimary.h, hsvPrimary.s, hsvPrimary.v);
     triadicShade1 = hsvToRgb(triadicColors[1].h, triadicColors[1].s, triadicColors[1].v);
     triadicShade2 = hsvToRgb(triadicColors[2].h, triadicColors[2].s, triadicColors[2].v);
     triadicLightShade1 = primaryTonalLight(triadicShade1.r, triadicShade1.g, triadicShade1.b);
     triadicLightShade2 = primaryTonalLight(triadicShade2.r, triadicShade2.g, triadicShade2.b);

    triadicColor1.style.backgroundColor = `${rgbToHex(triadicShade1.r,triadicShade1.g, triadicShade1.b )}`;
    triadicColor1.innerHTML = `<div class="text-pill"> <b>${rgbToHex(triadicShade1.r,triadicShade1.g, triadicShade1.b )}</b> </div>`

    triadicColor2.style.backgroundColor = `${rgbToHex(triadicShade2.r,triadicShade2.g, triadicShade2.b )}`;
    triadicColor2.innerHTML = `<div class="text-pill"> <b>${rgbToHex(triadicShade2.r,triadicShade2.g, triadicShade2.b )}</b> </div>`

    triadicTonalLightColor1.style.backgroundColor = `${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)}`;
    triadicTonalLightColor1.innerHTML = `<div class="text-pill"> <b> ${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)}</b></div>`;

    triadicTonalLightColor2.style.backgroundColor = `${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)}`;
    triadicTonalLightColor2.innerHTML = `<div class="text-pill"> <b> ${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)}</b></div>`;


    //tetradic colors
    const tetradicColors = getTetradicColors(hsvPrimary.h, hsvPrimary.s, hsvPrimary.v);
    tetradicShade1 = hsvToRgb(tetradicColors[1].h, tetradicColors[1].s, tetradicColors[1].v);
    tetradicShade2 = hsvToRgb(tetradicColors[2].h, tetradicColors[2].s, tetradicColors[2].v);
    tetradicShade3 = hsvToRgb(tetradicColors[3].h, tetradicColors[3].s, tetradicColors[3].v);
    tetradicLightShade1 = primaryTonalLight(tetradicShade1.r, tetradicShade1.g, tetradicShade1.b);
    tetradicLightShade2 = primaryTonalLight(tetradicShade2.r, tetradicShade2.g, tetradicShade2.b);
    tetradicLightShade3 = primaryTonalLight(tetradicShade3.r, tetradicShade3.g, tetradicShade3.b);

    tetradicColor1.style.backgroundColor = `${rgbToHex(tetradicShade1.r,tetradicShade1.g, tetradicShade1.b )}`;
    tetradicColor1.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicShade1.r,tetradicShade1.g, tetradicShade1.b )} </b></div>`;
    
    tetradicColor2.style.backgroundColor = `${rgbToHex(tetradicShade2.r,tetradicShade2.g, tetradicShade2.b )}`;
    tetradicColor2.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicShade2.r,tetradicShade2.g, tetradicShade2.b )} </b></div>`;

    tetradicColor3.style.backgroundColor = `${rgbToHex(tetradicShade3.r,tetradicShade3.g, tetradicShade3.b )}`;
    tetradicColor3.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicShade3.r,tetradicShade3.g, tetradicShade3.b )} </b></div>`;

    tetradicTonalLightColor1.style.backgroundColor = `${rgbToHex(tetradicLightShade1.r,tetradicLightShade1.g, tetradicLightShade1.b )}`;
    tetradicTonalLightColor1.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicLightShade1.r,tetradicLightShade1.g, tetradicLightShade1.b )}</b></div>`;

    tetradicTonalLightColor2.style.backgroundColor = `${rgbToHex(tetradicLightShade2.r,tetradicLightShade2.g, tetradicLightShade2.b )}`;
    tetradicTonalLightColor2.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicLightShade2.r,tetradicLightShade2.g, tetradicLightShade2.b )}</b></div>`;

    tetradicTonalLightColor3.style.backgroundColor = `${rgbToHex(tetradicLightShade3.r,tetradicLightShade3.g, tetradicLightShade3.b )}`;
    tetradicTonalLightColor3.innerHTML = `<div class="text-pill"><b>${rgbToHex(tetradicLightShade3.r,tetradicLightShade3.g, tetradicLightShade3.b )}</b></div>`;

    // Apply colors to the mock template
    for (const text of texts){
        text.style.color = `${typographyColor(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;
    }
    btns.forEach(btn => {
        btn.style.backgroundColor = `${rgbToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;
        btn.style.color = `${typographyColor(primaryShade.r, primaryShade.g, primaryShade.b)}`;
    });

    intro.style.backgroundColor = `${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)}`;
    links.style.background = `linear-gradient(180deg,${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)} 0%, ${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)} 100%)`;
    youtube.style.backgroundColor = `${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;



    // Change the color of the SVG icon
    const svgIcon = document.querySelector("#pallet");
if (svgIcon) {
    const paths = svgIcon.querySelectorAll("path"); // Select all path elements
    paths.forEach((path) => {
        path.setAttribute("fill", rgbToHex(primaryShade.r, primaryShade.g, primaryShade.b)) // Update the fill color
    });
}
    
    // show output and mocktemplate
    output.classList.remove("hide");
    template.classList.remove("hide");

    // change layout of the Theme builder
    themeBuilder.classList.remove("content");
    themeBuilder.classList.add("content-after");
}

// function to change options
function changeTemplateColors(option){
    if (option === 1){
    intro.style.backgroundColor = `${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)}`;
    links.style.background = `linear-gradient(180deg,${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)} 0%, ${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)} 100%)`;
    youtube.style.backgroundColor = `${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;


    }
    else if (option ===2){
        intro.style.backgroundColor = `${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)}`;
        links.style.background = `linear-gradient(180deg,${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)} 0%, ${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)} 100%)`;
        youtube.style.backgroundColor = `${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;
    }

    else if (option ===3){
        intro.style.backgroundColor = `${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)}`;
        links.style.background = `linear-gradient(180deg,${rgbToHex(triadicLightShade1.r, triadicLightShade1.g, triadicLightShade1.b)} 0%, ${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)} 100%)`;
        youtube.style.backgroundColor = `${rgbToHex(triadicLightShade2.r, triadicLightShade2.g, triadicLightShade2.b)}`;

    }

    else if (option === 4){
        intro.style.backgroundColor = `${rgbToHex(complementaryTonalLightShade.r, complementaryTonalLightShade.g, complementaryTonalLightShade.b)}`;
        links.style.background = `linear-gradient(180deg,${rgbToHex(complementaryTonalLightShade.r, complementaryTonalLightShade.g, complementaryTonalLightShade.b)} 0%, ${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)} 100%)`;
        youtube.style.backgroundColor = `${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}`;
        
        }
    

}

    // Function to download CSV
    function downloadCSV() {
     
    // Extract the RGB values from the color picker
    const color = colorPicker.value;
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);
    
    // Build the CSV content
    const csvContent = `Color Variable,Color Code\n` + 
    `Primary,${rgbToHex(primaryShade.r, primaryShade.g, primaryShade.b)}\n` +
    `Primary tonal light,${rgbToHex(primaryTonalLightShade.r, primaryTonalLightShade.g, primaryTonalLightShade.b)}\n` +
    `Complementary,${rgbToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}\n` +
    `Complementary tonal light,${rgbToHex(complementaryTonalLightShade.r, complementaryTonalLightShade.g, complementaryTonalLightShade.b)}\n` +
    `Triadic 1, ${rgbToHex(triadicShade1.r,triadicShade1.g, triadicShade1.b )}\n`+
    `Triadic 2, ${rgbToHex(triadicShade2.r,triadicShade2.g, triadicShade2.b )}\n`+
    `Triadic tonal light 1, ${rgbToHex(triadicLightShade1.r,triadicLightShade1.g, triadicLightShade1.b )}\n`+
    `Triadic tonal light 2, ${rgbToHex(triadicLightShade2.r,triadicLightShade2.g, triadicLightShade2.b )}\n`+
    `Tetradic 1, ${rgbToHex(tetradicShade1.r,tetradicShade1.g, tetradicShade1.b )}\n`+
    `Tetradic 2, ${rgbToHex(tetradicShade2.r,tetradicShade2.g, tetradicShade2.b )}\n`+
    `Tetradic 3, ${rgbToHex(tetradicShade3.r,tetradicShade3.g, tetradicShade3.b )}\n`+
    `Tetradic tonal light 1, ${rgbToHex(tetradicLightShade1.r,tetradicLightShade1.g, tetradicLightShade1.b )}\n`+
    `Tetradic tonal light 2, ${rgbToHex(tetradicLightShade2.r,tetradicLightShade2.g, tetradicLightShade2.b )}\n`+
    `Tetradic tonal light 3, ${rgbToHex(tetradicLightShade3.r,tetradicLightShade3.g, tetradicLightShade3.b )}\n`+
    `Typography,${typographyColor(red, green, blue)}`;

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "colors.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listener for form submission
colorCalculator.addEventListener("submit", calculateColors);

// Event listener for download csv
document.getElementById("download-btn").addEventListener("click", downloadCSV);

// Event listener for option change
option1.addEventListener("click", () => changeTemplateColors(1));
option2.addEventListener("click", () => changeTemplateColors(2));
option3.addEventListener("click", () => changeTemplateColors(3));
option4.addEventListener("click", () => changeTemplateColors(4));

