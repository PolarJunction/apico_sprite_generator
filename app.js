'use strict'

const switcher = document.querySelector('.btn');
const nxtHead = document.querySelector('.nextHead');
const nxtShirt = document.querySelector('.nextShirt');
const nxtHair = document.querySelector('.nextHair');
const nxtEyes = document.querySelector('.nextEyes');
const nxtHairCol = document.querySelector('.nextHairCol');


var PALETTE = {
    'green': ['#33847e', '#43ad9c', '#77cab3', '#bde5d3'],
    'brown': ['#564457', '#765b69', '#95757e', '#a2868e'],
    'skin': ['#855954', '#c28374', '#e3b9a1', '#e6cbbc'],
    'red': ['#91474e', '#aa5151', '#ca734e', '#d99563'],
    'yellow': ['#ac743e', '#ac743e', '#dfb162', '#e8c98d'],
    'turq': ['#325266', '#426f80', '#598696', '#80b4bf'],
    'blue': ['#51819a', '#96ced4', '#b8e2e3', '#dcf4f5'],
    'grey': ['#a8a6a5', '#cfccca', '#e9e6e2', '#f0f0f0'],
}

var paletteKeys = Object.keys(PALETTE);
var spriteSheet = new Image();
spriteSheet.src = "img/sprite_sheet.png";

var curButton = [];
var curColor = { "hair": paletteKeys[1], "shirt": paletteKeys[7], "pattern": paletteKeys[1] };
var totalSprites = {
    "hair": 5,
    "head": 4,
    "eyes": 4,
    "pattern": 2
}

var curSel = { "hair": 0, "head": 0, "eyes": 0, "pattern": 0 }

/* Create the palette buttons for colour selection */
createPaletteButtons(PALETTE, "hair", "hairColButtons");
createPaletteButtons(PALETTE, "shirt", "shirtColButtons");
createPaletteButtons(PALETTE, "pattern", "patternColButtons");

nxtHead.addEventListener('click', () => inc("head"));
nxtShirt.addEventListener('click', () => inc("pattern"));
nxtHair.addEventListener('click', () => inc("hair"));
nxtEyes.addEventListener('click', () => inc("eyes"));

function inc(className) {
    if (++curSel[className] >= totalSprites[className]) curSel[className] = 0;
    drawCanvas();
}

function createPaletteButtons(palette, buttonClass, divClass) {
    for (var key in palette) {
        var button = document.createElement('button');
        button.className = ("color " + buttonClass);
        button.id = key;
        button.style.backgroundColor = palette[key][1];

        if (!curButton[buttonClass] && (curColor[buttonClass] == key)) {
            curButton[buttonClass] = button;
            curButton[buttonClass].classList.add("highlight");
        }

        button.onclick = function() {
            if (curButton[buttonClass]) {
                curButton[buttonClass].classList.remove("highlight");
            }
            this.classList.add("highlight");
            curButton[buttonClass] = this;
            curColor[buttonClass] = this.id;

            drawCanvas();
        }

        document.getElementById(divClass).appendChild(button);
    }
}

function genColourSprite(sprite, dw, dh, w, h, palette, frames) {

    const retCanvas = document.createElement('canvas');
    retCanvas.width = w;
    retCanvas.height = h;
    const retCtx = retCanvas.getContext('2d');

    for (var i = 1; i < frames; i++) {
        retCtx.drawImage(genColour(sprite, dw + (i * w), dh, w, h, palette[i - 1]), 0, 0);
    }

    retCtx.drawImage(sprite, dw, dh, w, h, 0, 0, w, h);

    return retCanvas;
}

function genColour(sprite, dw, dh, w, h, colour) {

    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = w;
    tmpCanvas.height = h;
    const tmpCtx = tmpCanvas.getContext('2d');

    tmpCtx.drawImage(sprite, dw, dh, w, h, 0, 0, w, h);
    tmpCtx.globalCompositeOperation = 'source-in';

    tmpCtx.fillStyle = colour;
    tmpCtx.fillRect(0, 0, w, h);

    return tmpCanvas;
}


function drawCanvas() {
    var canvas = document.getElementById("npcBust");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(genColourSprite(spriteSheet, 448, 0, 32, 32, PALETTE[curColor["shirt"]], 3), 0, 4);
    ctx.drawImage(genColourSprite(spriteSheet, 576, 0 + (curSel["pattern"] * 32), 32, 32, PALETTE[curColor["pattern"]], 4), 0, 4);
    ctx.drawImage(spriteSheet, 192 + (curSel["head"] * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(spriteSheet, 320 + (curSel["eyes"] * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(genColourSprite(spriteSheet, 0, 0 + (curSel["hair"] * 32), 32, 32, PALETTE[curColor["hair"]], 5), 0, 0);
}

spriteSheet.onload = function() {
    drawCanvas();
}