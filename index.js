const buttons = document.querySelectorAll(".buttons");

const outputs = document.querySelectorAll(".output")
let index = 0

const yellowButton = document.getElementById("yellow");
const ashButton = document.getElementById("ash");

yellowButton.onclick = () => eliminateItems(0);
ashButton.onclick = () => eliminateItems(1);

let items = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
};

let results = {};


assignColors();

for (let button of buttons) {
    const color = items[button.id].color;
    setButtonColor(button, color);
}

function eliminateItems(color) {
    const filtered = {};

    for (let key in items) {
        if (items[key].color === color) {
            filtered[key] = items[key];
        }
    }
    
    assignColors();

    if (Object.keys(results).length === 0) {
        results = { ...filtered };

    } else if(Object.keys(results).length > 1){
        for (let key in results) {
            if (!filtered[key]) {
                delete results[key];
            }
        }
    }else{
        const finalKey = Object.keys(results)[0];
        if(index < outputs.length){
            outputs[index].innerText = finalKey[0]
            index += 1
            results = {}
        }else{
            refresh()
        }
        
    }
    updateButtonColors();
}

function assignColors() {
    const colors = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    // Fisher-Yates shuffle algorithm
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }

    // Assign shuffled colors to items
    for (let i = 0; i < buttons.length; i++) {
        const buttonId = buttons[i].id;
        items[buttonId].color = colors[i];
    }
}

function updateButtonColors() {
    for (let button of buttons) {
        const color = items[button.id].color;
        setButtonColor(button, color);
    }
}

function setButtonColor(button, color) {
    const yellow = "#ffeb3b";
    const ash = "#b2beb5";
    button.style.backgroundColor = color === 0 ? yellow : ash;
}

