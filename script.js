const themeBuilder = document.getElementById("theme-builder");
const colorCalculator = document.getElementById("color-calculator");
const output = document.querySelector(".output");
const template = document.querySelector(".template");
const colorPicker = document.getElementById("color-picker");
const errorMessage = document.getElementById("error");

// For the template
const intro = document.getElementById("intro");
const content = document.getElementById("para");
const contentButton = document.getElementById("para-btn");
const btns = document.querySelectorAll(".button");
const items = document.querySelectorAll(".item");
const texts = document.querySelectorAll("span");

// For the template colors
const primaryColor = document.querySelector("#primary-color");
const complementaryColor = document.querySelector("#complementary-color");
const backgroundColor1 = document.querySelector("#background1");
const backgroundColor2 = document.querySelector("#background2");
const typography = document.querySelector("#typography");


// rgb to HEX code conversion
function rbgToHex(r,g,b) {
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

function background1(r, g, b) { //for background1 color
    return {
        r: Math.floor((255 * 9 + r) / 10), 
        g: Math.floor((255 * 9 + g) / 10), 
        b: Math.floor((255 * 9 + b) / 10)
    };
}

function background2(r, g, b) { //for background2 color
    return {
        r: Math.floor((255 * 9 + (255 - r)) / 10),
        g: Math.floor((255 * 9 + (255 - g)) / 10), 
        b: Math.floor((255 * 9 + (255 - b)) / 10)
    };
}

function typographyColor(r, g, b) {
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    return brightness > 186 ? '#333333' : '#ffffff';
}


function calculateColors(e) {
    e.preventDefault();


    // Extract the RGB values from the color picker
    const color = colorPicker.value;
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);

    const primaryShade = primary(red, green, blue);
    const complementaryShade = complementary(red, green, blue);
    const backgroundShade1 = background1(red, green, blue);
    const backgroundShade2 = background2(red, green, blue);

    primaryColor.style.backgroundColor = `${rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;
    primaryColor.style.color = `${typographyColor(primaryShade.r, primaryShade.g, primaryShade.b)}`;
    primaryColor.innerText = `Primary-color: ${rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;

    complementaryColor.style.backgroundColor = `${rbgToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}`;
    complementaryColor.style.color = `${typographyColor(complementaryShade.r, complementaryShade.g, complementaryShade.b)}`;
    complementaryColor.innerText = `Complementary-color: ${rbgToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}`;

    backgroundColor1.style.backgroundColor = `${rbgToHex(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;
    backgroundColor1.style.color = `${typographyColor(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;
    backgroundColor1.innerText = `Background1: ${rbgToHex(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;

    backgroundColor2.style.backgroundColor = `${rbgToHex(backgroundShade2.r, backgroundShade2.g, backgroundShade2.b)}`;
    backgroundColor2.style.color = `${typographyColor(backgroundShade2.r, backgroundShade2.g, backgroundShade2.b)}`;
    backgroundColor2.innerText = `Background2: ${rbgToHex(backgroundShade2.r, backgroundShade2.g, backgroundShade2.b)}`;

    typography.style.backgroundColor = `${typographyColor(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;
    typography.style.color = `${typographyColor(255-backgroundShade1.r, 255-backgroundShade1.g, 255-backgroundShade1.b)}`;
    typography.innerText = `Typography: ${typographyColor(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;


    // Apply colors to the mock template
    for (const text of texts){
        text.style.color = `${typographyColor(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;
    }

    btns.forEach(btn => {
        btn.style.backgroundColor = `${rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;
        btn.style.color = `${typographyColor(primaryShade.r, primaryShade.g, primaryShade.b)}`;
    });
    intro.style.backgroundColor = `${rbgToHex(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;

    content.style.backgroundColor = `${rbgToHex(backgroundShade2.r, backgroundShade2.g, backgroundShade2.b)}`;
    contentButton.style.backgroundColor = `${rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)}`;

    items.forEach(item => {
        item.style.backgroundColor = `${rbgToHex(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}`;
    });


    // Change the color of the SVG icon
    const svgIcon = document.querySelector("#pallet");
if (svgIcon) {
    const paths = svgIcon.querySelectorAll("path"); // Select all path elements
    paths.forEach((path) => {
        path.setAttribute("fill", rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)) // Update the fill color
    });
}
    
    // show output and mocktemplate
    output.classList.remove("hide");
    template.classList.remove("hide");

    // change layout of the Theme builder
    themeBuilder.classList.remove("content");
    themeBuilder.classList.add("content-after");
}


    // Function to download CSV
    function downloadCSV() {
     
    // Extract the RGB values from the color picker
    const color = colorPicker.value;
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);
        
    const primaryShade = primary(red, green, blue);
    const complementaryShade = complementary(red, green, blue);
    const backgroundShade1 = background1(red, green, blue);
    const backgroundShade2 = background2(red, green, blue);
    
    // Build the CSV content
    const csvContent = `Color Variable,Color Code\n` + 
    `Primary color,${rbgToHex(primaryShade.r, primaryShade.g, primaryShade.b)}\n` +
    `Complementary color,${rbgToHex(complementaryShade.r, complementaryShade.g, complementaryShade.b)}\n` +
    `Background color 1,${rbgToHex(backgroundShade1.r, backgroundShade1.g, backgroundShade1.b)}\n` +
    `Background color 2,${rbgToHex(backgroundShade2.r, backgroundShade2.g, backgroundShade2.b)}\n` +
    `Typography color,${typographyColor(red, green, blue)}`;

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
document.getElementById("download-btn").addEventListener("click", downloadCSV);
