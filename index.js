const buttons = document.querySelectorAll(".buttons");

const outputs = document.querySelectorAll(".output")

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


let index = 0
highlightInputArea()


let results = {};

shuffleColor()

updateButtonColors()

function eliminateItems(color) {
    const filtered = {};

    for (let key in items) {
        if (items[key].color === color) {
            filtered[key] = items[key];
        }
    }

    if (Object.keys(results).length === 0) {
        results = { ...filtered };

    } else if (Object.keys(results).length > 1) {
        for (let key in results) {
            if (!filtered[key]) {
                delete results[key];
            }
        }

        if (index < outputs.length && Object.keys(results).length === 1) {
            const finalKey = Object.keys(results)[0];
            outputs[index].innerText = finalKey[0]
            index += 1
            highlightInputArea()
            results = {}
        }
    } else {
        refresh()
    }

    shuffleColor()
    updateButtonColors()

}


function shuffleColor() {
    if (Object.keys(results).length > 1) {
        const colors = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
        const resultColors = colors.slice(0, Object.keys(results).length)
        for (let i = resultColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultColors[i], resultColors[j]] = [resultColors[j], resultColors[i]];
        }

        let i = 0
        for (let key in results) {
            results[key].color = resultColors[i]
            i++
        }

        const remainingItems = colors.slice(Object.keys(results).length)
        for (let i = remainingItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remainingItems[i], remainingItems[j]] = [remainingItems[j], remainingItems[i]];
        }
        
        let j = 0
        for (let key in items) {
            if (!results[key]) {
                items[key].color = remainingItems[j]
                j++
            }
        }

    } else {
        const colors = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        let i = 0
        for (let key in items) {
            items[key].color = colors[i]
            i++
        }
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

function highlightInputArea() {
    if (index < outputs.length) {
        outputs[index].style.border = "5px solid black"
    }

}

function refresh() {
    window.location.reload();
}

