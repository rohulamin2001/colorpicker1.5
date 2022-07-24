/***********
Date: 09-07-2022
Author : Rohul Amin 
Description : Color Picker Application
Version : 1.5
************/


// Globals 

const hexField = document.querySelector(".hex-field");

const rgbField = document.querySelector(".rgb-field");

const randomColorBtn = document.querySelector(".change-color-btn");

const hexCopyBtn = document.querySelector(".hex-copy-btn");

const rgbCopyBtn = document.querySelector(".rgb-copy-btn");

const selectColorName = document.getElementsByName("selectcolorname");

const uploadBtn = document.querySelector(".upload-group label")

const uploadInputFile = document.querySelector(".upload-group input")

const bgPreview = document.querySelector(".bg-preview")

const removeFile = document.querySelector(".remove-file")
removeFile.style.display = "none";

const rightSideFooter = document.querySelector(".right-side-footer")
rightSideFooter.style.display = "none";

let body = document.body;

const copyBtn = document.querySelector(".copybutton")

let toastDiv = null;

const clickAudioSound = new Audio("audio/clicksound.wav")

const resetAudioSound = new Audio("audio/clicksound2.wav")

const saveAudioSound = new Audio("audio/savesound.wav")

const presetContainer = document.querySelector(".preset-container")

const saveBtn = document.querySelector(".savebutton");

const customPresetResetbtn = document.querySelector(".resetbtn");

const allpreset = document.querySelector(".allpreset")

const bgPrefferences = document.querySelectorAll(".bg-prefferences")

const allColorForPreset = [
    "#4287f5",
    "#4842f5",
    "#da42f5",
    "#cc0c19",
    "#4d3e3f",
    "#001428",
    "#323d04",
    "#7d3f01",
    "#ff8000",
    "#1c7805",
    "#6457c9",
    "#360047",
    "#8a007c",
    "#6b6467",
    "#63022e",

];

// Onload handler 

window.addEventListener("load", function () {
    colorSlider()
    printPresetItem();


})

// Main or boot function, this function will take care of getting all the DOM references

function updateColorCodeToDom(color) {
    const displayColor = document.querySelector(".display-color-section");

    const colorSliderRed = document.querySelector("#color-slider-red");

    const colorSliderGreen = document.querySelector("#color-slider-green");

    const colorSliderBlue = document.querySelector("#color-slider-blue");

    const labelGroup = document.querySelectorAll(".lebal-group");

    colorSliderRed.value = color.red;

    colorSliderGreen.value = color.green;

    colorSliderBlue.value = color.blue;

    labelGroup[0].children[1].innerHTML = color.red;

    labelGroup[1].children[1].innerHTML = color.green;

    labelGroup[2].children[1].innerHTML = color.blue;

    displayColor.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;

    displayColor.style.transition = "all .5s";
    hexField.value = hexCodeGenerator(
        {
            red: parseInt(color.red),
            green: parseInt(color.green),
            blue: parseInt(color.blue)
        }
    )

    rgbField.value = rgbCodeGenerator({
        red: color.red,
        green: color.green,
        blue: color.blue
    })

}

// Event handlers

uploadInputFile.addEventListener("change", function (e) {
    const uploadedFile = e.target.files[0];
    const imgURL = URL.createObjectURL(uploadedFile)
    bgPreview.style.background = `url(${imgURL})`;
    // document.body.style.background = `url(${imgURL})`;
    removeFile.style.display = "inline";
    rightSideFooter.style.display = "block";
})

removeFile.addEventListener("click", function () {
    removeImgRightSide();

})

function removeImgRightSide() {
    bgPreview.style.background = `none`;
    bgPreview.style.background = "#dddddd";
    removeFile.style.display = "none";
    rightSideFooter.style.display = "none";
    document.body.style.background = "none";
    uploadInputFile.value = null;
}


document.getElementById("bg-size").addEventListener("change",changeBgPrefferencess)
document.getElementById("bg-repeat").addEventListener("change",changeBgPrefferencess)
document.getElementById("bg-position").addEventListener("change",changeBgPrefferencess)
document.getElementById("bg-attachment").addEventListener("change",changeBgPrefferencess)
function changeBgPrefferencess() {
    bgPreview.style.backgroundSize = document.getElementById("bg-size").value;
    // document.body.style.backgroundSize = document.getElementById("bg-size").value;
    
    bgPreview.style.backgroundRepeat = document.getElementById("bg-repeat").value;
    // document.body.style.backgroundRepeat = document.getElementById("bg-repeat").value;

    bgPreview.style.backgroundPosition = document.getElementById("bg-position");
    // document.body.style.backgroundPosition = document.getElementById("bg-position");
    
    bgPreview.style.backgroundAttachment = document.getElementById("bg-attachment").value;
    // document.body.style.backgroundAttachment = document.getElementById("bg-attachment").value;
    


}

allpreset.addEventListener("click", function (event) {
    if (event.target.className == "preset-item") {
        event.target.classList.add("preset-effect")
        clickAudioSound.volume = .3;
        clickAudioSound.play();
        const dataColor = event.target.getAttribute("data-color");
        navigator.clipboard.writeText(dataColor)
        setTimeout(function () {
            event.target.classList.remove("preset-effect")
        }, 1000)
        if (toastDiv != null) {
            toastDiv.remove();
        }
        toastDiv = document.createElement("div");
        toastDiv.innerHTML = `${dataColor} Copied`;
        toastDiv.className = "toast-message animation-in-toast";
        body.appendChild(toastDiv);

        setTimeout(function () {
            toastDiv.classList.add("animation-out-toast")
            toastDiv.classList.remove("animation-in-toast")

            toastDiv.addEventListener("animationend", function () {
                toastDiv.remove();

            })
        }, 5000)

    };


})

customPresetResetbtn.addEventListener("click", function () {
    let customPresetContainer = document.querySelector(".custom-preset-container");


    const child = customPresetContainer.lastElementChild
    console.log(customPresetContainer.lastElementChild);
    if (customPresetContainer.lastElementChild == null) {
        alert("There is nothing to remove")
    } else {
        child.remove();
        resetAudioSound.volume = .3;
        resetAudioSound.play();
    }

})
/**
 * // add click event listener with copy button for copy the hex color code

 */

randomColorBtn.addEventListener("click", function () {

    const storeDecimalNo = generateDecimalNo();
    const storeHex = hexCodeGenerator(storeDecimalNo)
    const decimalNumber = hexToDecimalNo(storeHex)
    updateColorCodeToDom(decimalNumber)

    const storeRgb = rgbCodeGenerator(storeDecimalNo);
    hexField.value = storeHex;
    rgbField.value = storeRgb;


})

/**
 * color Slider
 */


function colorSlider() {

    const colorSliderRed = document.querySelector("#color-slider-red");

    const colorSliderGreen = document.querySelector("#color-slider-green");

    const colorSliderBlue = document.querySelector("#color-slider-blue");


    colorSliderRed.addEventListener("input", function (event) {
        redSliderValue = event.target.value;
        updateColorCodeToDom(
            {
                red: redSliderValue,
                green: colorSliderGreen.value,
                blue: colorSliderBlue.value
            }
        )

    })
    colorSliderGreen.addEventListener("input", function (event) {
        greenSliderValue = event.target.value;
        updateColorCodeToDom(
            {
                red: colorSliderRed.value,
                green: greenSliderValue,
                blue: colorSliderBlue.value
            }
        )
    })
    colorSliderBlue.addEventListener("input", function (event) {
        blueSliderValue = event.target.value;
        updateColorCodeToDom(
            {
                red: colorSliderRed.value,
                green: colorSliderGreen.value,
                blue: blueSliderValue
            }
        )
    })

}
saveBtn.addEventListener("click", function () {
    const customPresetContainer = document.querySelector(".custom-preset-container");
    let storeColor = checkColor(selectColorName);
    if (storeColor == "hex") {

        if (hexField.value != "" && isValidHex(hexField.value)) {

            let customPreset = createPresetItem(`#${hexField.value}`);

            customPresetContainer.appendChild(customPreset)

            saveAudioSound.volume = .3;
            saveAudioSound.play();

        } else {
            alert("Invalid Hex Code")
        }
    }
    if (storeColor == "rgb") {
        if (rgbField.value != "") {
            let customPreset = createPresetItem(`${rgbField.value}`)
            customPresetContainer.appendChild(customPreset)

            clickAudioSound.volume = .3;
            clickAudioSound.play();
        } else {
            alert("Invalid Rgb Code")
        }
    }


})

copyBtn.addEventListener("click", function () {
    let storeColor = checkColor(selectColorName);
    if (storeColor == "hex") {
        if (hexField.value != "" && isValidHex(hexField.value)) {
            generateHexToastMsg();
            clickAudioSound.volume = .3;
            clickAudioSound.play();
        } else {
            alert("Invalid Hex Code")
        }
    }
    if (storeColor == "rgb") {
        if (rgbField.value != "") {
            generateRGBToastMsg();
            clickAudioSound.volume = .3;
            clickAudioSound.play();
        } else {
            alert("Invalid Rgb Code")
        }
    }
})


// Dom function 


function generateHexToastMsg() {
    navigator.clipboard.writeText(`#${hexField.value}`)
    if (toastDiv != null) {
        toastDiv.remove();
    }
    toastDiv = document.createElement("div");
    toastDiv.innerHTML = `#${hexField.value} Copied`;
    toastDiv.className = "toast-message animation-in-toast";
    body.appendChild(toastDiv);

    setTimeout(function () {
        toastDiv.classList.add("animation-out-toast")
        toastDiv.classList.remove("animation-in-toast")

        toastDiv.addEventListener("animationend", function () {
            toastDiv.remove();
        })
    }, 5000)
}


function generateRGBToastMsg() {
    navigator.clipboard.writeText(`${rgbField.value}`)
    if (toastDiv != null) {
        toastDiv.remove();
    }
    toastDiv = document.createElement("div");
    toastDiv.innerHTML = `${rgbField.value} Copied`;
    toastDiv.className = "toast-message animation-in-toast";
    body.appendChild(toastDiv);

    setTimeout(function () {
        toastDiv.classList.add("animation-out-toast")
        toastDiv.classList.remove("animation-in-toast")

        toastDiv.addEventListener("animationend", function () {
            toastDiv.remove();

        })
    }, 5000)
}


function checkColor(colorList) {
    let checkValue = null;

    for (let x in colorList) {
        if (colorList[x].checked) {
            checkValue = colorList[x].value;
        }
    }

    return checkValue;
}

function createPresetItem(color) {

    const div = document.createElement("div");
    div.className = "preset-item";
    div.style.backgroundColor = color;
    div.setAttribute("data-color", color)
    return div;
}





function printPresetItem() {
    allColorForPreset.forEach(function (value) {
        const divContainer = createPresetItem(value)
        presetContainer.appendChild(divContainer)

    })

}

// Utils 

/**
 * this function generate decimal number and returns an object
 * @returns {object}
 */
function generateDecimalNo() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return {
        red,
        green,
        blue
    }
}

/**
 * take a color object of three decimal values and return a valid hexadecimal color code
 * @param {object} color 
 * @returns {string}
 */
function hexCodeGenerator(color) {

    let red = `${color.red.toString(16)}`;
    let green = `${color.green.toString(16)}`;
    let blue = `${color.blue.toString(16)}`;

    if (red.length < 2) {
        red = `0${color.red.toString(16)}`
    } else {
        red;
    }
    if (green.length < 2) {
        green = `0${color.green.toString(16)}`
    } else {
        green;
    }
    if (blue.length < 2) {
        blue = `0${color.blue.toString(16)}`
    } else {
        blue;
    }
    return `${red}${green}${blue}`

}

/**
 * convert hex color to integer number and return rgb color code 
 * @param {object} color 
 * @returns {string}
 */

function hexToDecimalNo(color) {

    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    return {
        red,
        green,
        blue
    }
}

// rgb color code generator 
function rgbCodeGenerator(color) {

    return `rgb(${color.red},${color.green},${color.blue})`;

}

// add keyup event handler with hexField
// for type valid hex code
hexField.addEventListener("keyup", function (event) {
    const color = event.target.value;
    hexField.value = color.toLowerCase()

    if (color && isValidHex(color)) {
        const colorObj = hexToDecimalNo(color)
        rgbField.value = `rgb(${colorObj.red},${colorObj.green},${colorObj.blue})`;
        updateColorCodeToDom(colorObj)
    }

})

/**
 *this is hex code validation function 
 * @param {string} color 
*/
function isValidHex(color) {
    if (color.length != 6) {
        return false;
    }

    return /^[0-9A-Fa-f]{6}$/i.test(color)

}