'use strict'

const switcher = document.querySelector('.btn');
const nxtName = document.querySelector('.nextName');
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

var NAMES = ["Emma","Isabella","Emily","Madison","Ava","Olivia","Sophia","Abigail","Elizabeth","Chloe","Samantha","Addison","Natalie","Mia","Alexis","Alyssa","Hannah","Ashley","Ella","Sarah","Grace","Taylor","Brianna","Lily","Hailey","Anna","Victoria","Kayla","Lillian","Lauren","Kaylee","Allison","Savannah","Nevaeh","Gabriella","Sofia","Makayla","Avery","Riley","Julia","Leah","Aubrey","Jasmine","Audrey","Katherine","Morgan","Brooklyn","Destiny","Sydney","Alexa","Kylie","Brooke","Kaitlyn","Evelyn","Layla","Madeline","Kimberly","Zoe","Jessica","Peyton","Alexandra","Claire","Madelyn","Maria","Mackenzie","Arianna","Jocelyn","Amelia","Angelina","Trinity","Andrea","Maya","Valeria","Sophie","Rachel","Vanessa","Aaliyah","Mariah","Gabrielle","Katelyn","Ariana","Bailey","Camila","Jennifer","Melanie","Gianna","Charlotte","Paige","Autumn","Payton","Faith","Sara","Isabelle","Caroline","Genesis","Isabel","Mary","Zoey","Gracie","Megan","Haley","Mya","Michelle","Molly","Stephanie","Nicole","Jenna","Natalia","Sadie","Jada","Serenity","Lucy","Ruby","Eva","Kennedy","Rylee","Jayla","Naomi","Rebecca","Lydia","Daniela","Bella","Keira","Adriana","Lilly","Hayden","Miley","Katie","Jade","Jordan","Gabriela","Amy","Angela","Melissa","Valerie","Giselle","Diana","Amanda","Kate","Laila","Reagan","Jordyn","Kylee","Danielle","Briana","Marley","Leslie","Kendall","Catherine","Liliana","Mckenzie","Jacqueline","Ashlyn","Reese","Marissa","London","Juliana","Shelby","Cheyenne","Angel","Daisy","Makenzie","Miranda","Erin","Amber","Alana","Ellie","Breanna","Ana","Mikayla","Summer","Piper","Adrianna","Jillian","Sierra","Jayden","Sienna","Alicia","Lila","Margaret","Alivia","Brooklynn","Karen","Violet","Sabrina","Stella","Aniyah","Annabelle","Alexandria","Kathryn","Skylar","Aliyah","Delilah","Julianna","Kelsey","Khloe","Carly","Amaya","Mariana","Christina","Alondra","Tessa","Eliana","Bianca","Jazmin","Clara","Vivian","Josephine","Delaney","Scarlett","Elena","Cadence","Alexia","Maggie","Laura","Nora","Ariel","Elise","Nadia","Mckenna","Chelsea","Lyla","Alaina","Jasmin","Hope","Leila","Caitlyn","Cassidy","Jacob","Michael","Ethan","Joshua","Daniel","Alexander","Anthony","William","Christopher","Matthew","Jayden","Andrew","Joseph","David","Noah","Aiden","James","Ryan","Logan","John","Nathan","Elijah","Christian","Gabriel","Benjamin","Jonathan","Tyler","Samuel","Nicholas","Gavin","Dylan","Jackson","Brandon","Caleb","Mason","Angel","Isaac","Evan","Jack","Kevin","Jose","Isaiah","Luke","Landon","Justin","Lucas","Zachary","Jordan","Robert","Aaron","Brayden","Thomas","Cameron","Hunter","Austin","Adrian","Connor","Owen","Aidan","Jason","Julian","Wyatt","Charles","Luis","Carter","Juan","Chase","Diego","Jeremiah","Brody","Xavier","Adam","Carlos","Sebastian","Liam","Hayden","Nathaniel","Henry","Jesus","Ian","Tristan","Bryan","Sean","Cole","Alex","Eric","Brian","Jaden","Carson","Blake","Ayden","Cooper","Dominic","Brady","Caden","Josiah","Kyle","Colton","Kaden","Eli","Miguel","Antonio","Parker","Steven","Alejandro","Riley","Richard","Timothy","Devin","Jesse","Victor","Jake","Joel","Colin","Kaleb","Bryce","Levi","Oliver","Oscar","Vincent","Ashton","Cody","Micah","Preston","Marcus","Max","Patrick","Seth","Jeremy","Peyton","Nolan","Ivan","Damian","Maxwell","Alan","Kenneth","Jonah","Jorge","Mark","Giovanni","Eduardo","Grant","Collin","Gage","Omar","Emmanuel","Trevor","Edward","Ricardo","Cristian","Nicolas","Kayden","George","Jaxon","Paul","Braden","Elias","Andres","Derek","Garrett","Tanner","Malachi","Conner","Fernando","Cesar","Javier","Miles","Jaiden","Alexis","Leonardo","Santiago","Francisco","Cayden","Shane","Edwin","Hudson","Travis","Bryson","Erick","Jace","Hector","Josue","Peter","Jaylen","Mario","Manuel","Abraham","Grayson","Damien","Kaiden","Spencer","Stephen","Edgar","Wesley","Shawn","Trenton","Jared","Jeffrey","Landen","Johnathan","Bradley","Braxton","Ryder","Camden","Roman","Asher","Brendan","Maddox","Sergio","Israel","Andy","Lincoln","Erik","Donovan","Raymond","Avery","Rylan","Dalton","Harrison","Andre","Martin","Keegan","Marco","Jude","Sawyer","Dakota","Leo","Calvin","Kai","Drake","Troy","Zion","Clayton","Roberto","Zane","Gregory","Tucker","Rafael","Kingston","Dominick","Ezekiel","Griffin","Devon","Drew","Lukas"];


var paletteKeys = Object.keys(PALETTE);
var spriteSheet = new Image();
spriteSheet.src = "img/sprite_sheet.png";

var curButton = [];
var curColor = { "hair": paletteKeys[1], "shirt": paletteKeys[7], "pattern": paletteKeys[1] };
var totalSprites = {
    "hair": 5,
    "head": 4,
    "eyes": 4,
    "pattern": 3
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
nxtName.addEventListener('click', () => gen_name());

function inc(className) {
    if (++curSel[className] >= totalSprites[className]) curSel[className] = 0;
    drawCanvas();
}

function gen_name() {
    // Just pick a random name from the list
    var name = NAMES[Math.floor(Math.random()*NAMES.length)];
    document.getElementById('name-input').value=name;
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

    ctx.drawImage(genColourSprite(spriteSheet, 448, 0, 32, 32, PALETTE[curColor["shirt"]], 4), 0, 4);
    ctx.drawImage(genColourSprite(spriteSheet, 608, 0 + (curSel["pattern"] * 32), 32, 32, PALETTE[curColor["pattern"]], 4), 0, 4);
    ctx.drawImage(spriteSheet, 192 + (curSel["head"] * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(spriteSheet, 320 + (curSel["eyes"] * 32), 0, 32, 32, 0, 4, 32, 32);
    ctx.drawImage(genColourSprite(spriteSheet, 0, 0 + (curSel["hair"] * 32), 32, 32, PALETTE[curColor["hair"]], 5), 0, 0);
}

/* 64 x 36 Bust Sprite */
function drawBustSprite() {
    var bustCanvas = document.getElementById("npcBust");
    var canvas = document.getElementById("npcBustSpr");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bustCanvas, 0, 0);
    ctx.drawImage(bustCanvas, 32, 0);
}



spriteSheet.onload = function() {
    drawCanvas();
    drawBustSprite();
    gen_name();
}


