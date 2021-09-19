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

var curHead = 0;
var curEyes = 0;
var curPattern = 0;
var curHair = 0;
var curPattern = 0;

var numHairs = 3;
var numHeads = 4;
var numEyes = 4;
var numPatterns = 2;

var curHairButton;
var curShirtButton;
var curPatternButton;

var hairCol = paletteKeys[1];
var shirtCol = paletteKeys[7];
var patternCol = paletteKeys[1];


nxtHead.addEventListener('click', function() {
    if (++curHead >= numHeads) curHead = 0;
    drawCanvas();
});

nxtShirt.addEventListener('click', function() {
    if (++curPattern >= numPatterns) curPattern = 0;
    drawCanvas();
});

nxtHair.addEventListener('click', function() {
    if (++curHair >= numHairs) curHair = 0;
    drawCanvas();
});

nxtEyes.addEventListener('click', function() {
    if (++curEyes >= numEyes) curEyes = 0;
    drawCanvas();
});


var hairRow = document.createElement('div');
for (var key in PALETTE) {
    var button = document.createElement('button');
    button.className = 'color hairColor';
    button.id = key;
    button.name = PALETTE[key][0];
    button.style.backgroundColor = PALETTE[key][1];
    button.setAttribute('onclick', 'update(this)');

    if (!curHairButton) {
        curHairButton = button;
        curHairButton.classList.add("highlight");
    }

    button.onclick = function() {
        if (curHairButton) {
            curHairButton.classList.remove("highlight");
        }
        this.classList.add("highlight");
        curHairButton = this;

        hairCol = this.id;
        drawCanvas();
    }

    hairRow.appendChild(button);
    document.getElementById('hairColButtons').appendChild(hairRow);
}

var shirtRow = document.createElement('div');
for (var key in PALETTE) {
    var button = document.createElement('button');
    button.className = 'color shirtColor';
    button.id = key;
    button.name = PALETTE[key][0];
    button.style.backgroundColor = PALETTE[key][1];
    button.setAttribute('onclick', 'update(this)');

    if (!curShirtButton) {
        curShirtButton = button;
        curShirtButton.classList.add("highlight");
    }

    button.onclick = function() {
        if (curShirtButton) {
            curShirtButton.classList.remove("highlight");
        }
        this.classList.add("highlight");
        curShirtButton = this;

        shirtCol = this.id;
        drawCanvas();
    }

    shirtRow.appendChild(button);
    document.getElementById('shirtColButtons').appendChild(shirtRow);
}

var patternRow = document.createElement('div');
for (var key in PALETTE) {
    var button = document.createElement('button');
    button.className = 'color patternColor';
    button.id = key;
    button.name = PALETTE[key][0];
    button.style.backgroundColor = PALETTE[key][1];
    button.setAttribute('onclick', 'update(this)');

    if (!curPatternButton) {
        curPatternButton = button;
        curPatternButton.classList.add("highlight");
    }

    button.onclick = function() {
        if (curPatternButton) {
            curPatternButton.classList.remove("highlight");
        }
        this.classList.add("highlight");
        curPatternButton = this;

        patternCol = this.id;
        drawCanvas();
    }

    patternRow.appendChild(button);
    document.getElementById('patternColButtons').appendChild(patternRow);
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

    ctx.drawImage(genColourSprite(spriteSheet, 448, 0, 32, 32, PALETTE[shirtCol], 3), 0, 4);
    ctx.drawImage(genColourSprite(spriteSheet, 576, 0 + (curPattern * 32), 32, 32, PALETTE[patternCol], 4), 0, 4);
    ctx.drawImage(spriteSheet, 192 + (curHead * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(spriteSheet, 320 + (curEyes * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(genColourSprite(spriteSheet, 0, 0 + (curHair * 32), 32, 32, PALETTE[hairCol], 5), 0, 0);
}

spriteSheet.onload = function() {
    drawCanvas();
}