//##############################################
//body
//Tic Tac toe datastructure definition
let ticTacToeDict = {
    'you': {
        'boxes': [],
        'playSymbol': '/images/o.png',
        'audio': '/audio/pop1.mp3',
        'clearMe': false,
    },
    'cpu': {
        'boxes': [],
        'playSymbol': '/images/x.png',
        'audio': '/audio/pop2.mp3',
        'clearMe': false,
    },
    'mainBoxes': ['#r1c1', '#r1c2', '#r1c3', '#r2c1', '#r2c2', '#r2c3', '#r3c1', '#r3c2', '#r3c3', ],
    'winCondition': {
        'con1': ['#r1c1', '#r1c2', '#r1c3', ],
        'con2': ['#r2c1', '#r2c2', '#r2c3', ],
        'con3': ['#r3c1', '#r3c2', '#r3c3', ],
        'con4': ['#r1c1', '#r2c1', '#r3c1', ],
        'con5': ['#r1c2', '#r2c2', '#r3c2', ],
        'con6': ['#r1c3', '#r2c3', '#r3c3', ],
        'con7': ['#r1c1', '#r2c2', '#r3c3', ],
        'con8': ['#r1c3', '#r2c2', '#r3c1', ],
    },
    'background': ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10', 'img11', ],
    'bars': {
        'con1': `<img src="images/hori_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:50px; left:1px; height:20px; width:370px;" alt="">`,
        'con2': `<img src="images/hori_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:175px; height:20px; left:1px; width:370px;" alt="">`,
        'con3': `<img src="images/hori_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; left:1px; top:310px; height:20px; width:370px;" alt="">`,
        'con4': `<img src="images/verti_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:1px; left: 70px; width: 20px; height:369px;" alt="">`,
        'con5': `<img src="images/verti_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:1px; left: 185px; width: 20px; height:369px;" alt="">`,
        'con6': `<img src="images/verti_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:1px; left: 300px; width: 20px; height:369px;" alt="">`,
        'con7': `<img src="images/left-diag_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:0px; left: 0px; height:0 auto; width:0 auto;" alt="">`,
        'con8': `<img src="images/right_diag_Strike.png" style="background: 0px 0px 0px rgba(0, 0, 0, 0); position: absolute; top:0px; left: 15px; height:0 auto; width:0 auto;" alt="">`,
    },
    'winArray': ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'],
    'winArray2': ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'],
    'winArray3': ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'],
    'turns': false,
    'draws': 0,
    'loses': 0,
    'wins': 0,
    'judjment': false,
    'tictacReset': false,
    'iloops': false,
    'raceCondition': false,
};

//players Definition
const YOU = ticTacToeDict['you'];
const CPU = ticTacToeDict['cpu'];

//sounds
const USER_sound = new Audio(YOU['audio']);
const CPU_sound = new Audio(CPU['audio']);
const WINsound = new Audio('/audio/cash.mp3');
const LOSSsound = new Audio('/audio/aww.mp3');

//This function changes the background when it is called
function changeBackground() {
    let newBackground = document.querySelector('body');
    if (screen.width <= 700) { //performing media query
        newBackground.setAttribute('style',
            `background: url(/images/bg/${ticTacToeDict['background'][Math.floor(Math.random() * ticTacToeDict['background'].length)]}.png);
		width: ${(screen.width)}px;
		height: ${(screen.height)}px;
		position: relative;`);
        document.querySelector('.container-1').style.color = 'white';
    } else {
        newBackground.setAttribute('style',
            `background: url(/images/bg/${ticTacToeDict['background'][Math.floor(Math.random() * ticTacToeDict['background'].length)]}.png);
		background-size: cover;
		position: relative;`);
        document.querySelector('.container-1').style.color = 'white';
    }
}

//The Main function where everything takes place
function ticTacToeMain(box) {
    let currentBox = box.id;
    setTimeout(() => {
        userPlayer(currentBox);
        setTimeout(() => {
            cpuPlayer();
        }, 1000);
    }, 0000);
}


//What happens if the user plays
function userPlayer(box) {
    if ((ticTacToeDict['turns'] == false)) {
        if ((CPU['boxes'].includes(`#${box}`) == false) && (YOU['boxes'].includes(`#${box}`) == false)) {
            if (!(ticTacToeDict['judgement'])) {
                document.querySelector(`#${box}`).querySelector('img').remove();
                image = document.querySelector(`#${box}`);
                image.innerHTML = `<img id="junkImage" src=${YOU['playSymbol']} alt="">`;
                subtractBox(box);
                addBoxToPlayerList(YOU, box);
                ticTacToeDict['turns'] = true;
                USER_sound.play();
                judgement(YOU);
                if (YOU['clearMe'] == true) {
                    setTimeout(() => {
                        showResults();
                        setTimeout(() => {
                            resetGrid(YOU);
                            ticTacToeDict['judgement'] = false;
                            YOU['clearMe'] = false;
                            ticTacToeDict['turns'] = false;
                            changeBackground();
                        }, 3000);
                    }, 0000);
                } else if ((YOU['clearMe'] == true) && ticTacToeDict['mainBoxes'].length == 0) {
                    ticTacToeDict['tictacReset'] = true;
                    changeBackground();
                }
            }
        }
    }
}

//Subtract transparent boxes from the mainBoxes array
function subtractBox(box) {
    let newArray1 = (ticTacToeDict['mainBoxes'].splice(0, ticTacToeDict['mainBoxes'].indexOf(`#${box}`))).concat(ticTacToeDict['mainBoxes'].splice((ticTacToeDict['mainBoxes'].indexOf(`#${box}`) + 1), (ticTacToeDict['mainBoxes'].length)));
    ticTacToeDict['mainBoxes'] = newArray1;
}

//This function adds boxes to each player boxes that has been subtracted from the mainBoxes array
function addBoxToPlayerList(player, box) {
    if ((YOU['boxes'].includes(`#${box}`) == false) && (CPU['boxes'].includes(`${box}`) == false) && (player == YOU)) {
        player['boxes'].push(`#${box}`);
    } else if ((YOU['boxes'].includes(`#${box}`) == false) && (CPU['boxes'].includes(`${box}`) == false) && (player == CPU)) {
        player['boxes'].push(`${box}`);
    }
}

//Generate a random number based on the number of elements in the main boxes
function randomNumber() {
    let randNum = Math.floor(Math.random() * ticTacToeDict['mainBoxes'].length);
    return randNum;
}


//The intelligence the CPU used to play with the user
function intelligence() {
    let intelCondition = ticTacToeDict['winCondition'];
    let newArray1 = [];
    ticTacToeDict['iloops'] = false;
    for (let i = 0; i < ticTacToeDict['winArray2'].length; i++) {
        newArray1 = intelCondition[ticTacToeDict['winArray2'][i]];
        if (YOU['boxes'].includes(newArray1[0]) && YOU['boxes'].includes(newArray1[1]) && (CPU['boxes'].includes(newArray1[2]) == false)) {
            document.querySelector(newArray1[2]).querySelector('img').remove();
            let image = document.querySelector(newArray1[2]);
            image.innerHTML = `<img id="junkImage" src=${CPU['playSymbol']} alt="">`;
            subtractBox(newArray1[2].slice(1, 5));
            addBoxToPlayerList(CPU, newArray1[2]);
            let myVar = (ticTacToeDict['winArray2'].splice(0, i)).concat(ticTacToeDict['winArray2'].splice((1), (ticTacToeDict['winArray2'].length)));
            ticTacToeDict['winArray2'] = myVar;
            ticTacToeDict['iloops'] = true;
            CPU_sound.play();
            judgement(CPU);
            break;
        } else if (YOU['boxes'].includes(newArray1[0]) && YOU['boxes'].includes(newArray1[2]) && (CPU['boxes'].includes(newArray1[1]) == false)) {
            document.querySelector(newArray1[1]).querySelector('img').remove();
            let image = document.querySelector(newArray1[1]);
            image.innerHTML = `<img id="junkImage" src=${CPU['playSymbol']} alt="">`;
            subtractBox(newArray1[1].slice(1, 5));
            addBoxToPlayerList(CPU, newArray1[1]);
            CPU_sound.play();
            judgement(CPU);
            let myVar = (ticTacToeDict['winArray2'].splice(0, i)).concat(ticTacToeDict['winArray2'].splice((1), (ticTacToeDict['winArray2'].length)));
            ticTacToeDict['winArray2'] = myVar;
            ticTacToeDict['iloops'] = true;
            break;
        } else if (YOU['boxes'].includes(newArray1[1]) && YOU['boxes'].includes(newArray1[2]) && (CPU['boxes'].includes(newArray1[0]) == false)) {
            document.querySelector(newArray1[0]).querySelector('img').remove();
            let image = document.querySelector(newArray1[0]);
            image.innerHTML = `<img id="junkImage" src=${CPU['playSymbol']} alt="">`;
            subtractBox(newArray1[0].slice(1, 5));
            addBoxToPlayerList(CPU, newArray1[0]);
            CPU_sound.play();
            judgement(CPU);
            let myVar = (ticTacToeDict['winArray2'].splice(0, i)).concat(ticTacToeDict['winArray2'].splice((1), (ticTacToeDict['winArray2'].length)));
            ticTacToeDict['winArray2'] = myVar;
            ticTacToeDict['iloops'] = true;
            break;
        }
    }

    if (ticTacToeDict['iloops'] == false) {
        ticTacToeDict['raceCondition'] = true;
    }

    if (ticTacToeDict['raceCondition'] == true) {
        let someNumber = randomNumber();
        let myBox = ticTacToeDict['mainBoxes'][someNumber];

        while (CPU['boxes'].includes(myBox) == true) {
            myBox = ticTacToeDict['mainBoxes'][randomNumber()];
            if (CPU['boxes'].includes(myBox) == false) {
                break;
            }
        }
        document.querySelector(myBox).querySelector('img').remove();
        let image = document.querySelector(myBox);
        image.innerHTML = `<img id="junkImage" src=${CPU['playSymbol']} alt="">`;
        let theBox = myBox;
        subtractBox(theBox.slice(1, 5));
        addBoxToPlayerList(CPU, myBox);
        CPU_sound.play();
        judgement(CPU);
        ticTacToeDict['iloops'] = true;
        ticTacToeDict['raceCondition'] = false;
    }
}

//The function that is responsible for the CPU's gameplay
function cpuPlayer() {
    if ((ticTacToeDict['turns'] == true)) {
        if (ticTacToeDict['mainBoxes'].length != 0) {
            intelligence();
            if (CPU['clearMe'] == true) {
                setTimeout(() => {
                    showResults();
                    setTimeout(() => {
                        resetGrid(CPU);
                        CPU['clearMe'] = false;
                        ticTacToeDict['turns'] = false;
                        changeBackground();
                    }, 3000);
                }, 0000);
            }
            ticTacToeDict['turns'] = false;
        } else {
            setTimeout(() => {
                ticTacToeDict['draws']++;
                ticTacToeDict['iloops'] = false;
                ticTacToeDict['winArray2'] = ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'];
                showResults();
                setTimeout(() => {
                    resetGrid(CPU);
                    CPU['clearMe'] = false;
                    ticTacToeDict['judgement'] = false;
                    ticTacToeDict['turns'] = false;
                    changeBackground();
                }, 3000);
            }, 0000);
        }
    }

}
/*Encountered some bugs with the loss score area so to solve this problem 
We redefine how the losses are recorded by creating a boolean variable which
after is set to false after increamenting the myloss variable by 1 each time there is a loss*/
let thisLoss = false;

//judgement function determines whether the CPU or the USER has won
function judgement(player) {
    let someVar;
    let barDiv;
    for (let i = 0; i < ticTacToeDict['winArray'].length; i++) {
        someVar = ticTacToeDict['winCondition'][ticTacToeDict['winArray'][i]];
        if ((player['boxes'].includes(someVar[0])) && (player['boxes'].includes(someVar[1])) && (player['boxes'].includes(someVar[2]))) {
            barDiv = document.querySelector('#barImages');
            barDiv.innerHTML = ticTacToeDict['bars'][ticTacToeDict['winArray'][i]];
            if ((player == CPU)) {
                ticTacToeDict['judgement'] = false;
                ticTacToeDict['tictacReset'] = true;
                CPU['clearMe'] = true;
                ticTacToeDict['loses']++;
                LOSSsound.play();
                ticTacToeDict['iloops'] = false;
                thisLoss = true;
                ticTacToeDict['winArray2'] = ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'];
            } else if ((player == YOU)) {
                ticTacToeDict['judgement'] = true;
                ticTacToeDict['turns'] = false;
                ticTacToeDict['tictacReset'] = true;
                ticTacToeDict['wins']++;
                WINsound.play();
                ticTacToeDict['iloops'] = false;
                ticTacToeDict['winArray2'] = ['con1', 'con2', 'con3', 'con4', 'con5', 'con6', 'con7', 'con8'];
                YOU['clearMe'] = true;
            }
        }
    }
}

//This function resets the grid boxes to it's original state once there is either a draw a win or a loss
function resetGrid(player) {
    if ((ticTacToeDict['mainBoxes'].length == 0)) {
        ticTacToeDict['mainBoxes'] = ['#r1c1', '#r1c2', '#r1c3', '#r2c1', '#r2c2', '#r2c3', '#r3c1', '#r3c2', '#r3c3'];
        let i;
        for (i in ticTacToeDict['mainBoxes']) {
            document.querySelector(`${ticTacToeDict['mainBoxes'][i]}`).querySelector('img').remove();
            document.querySelector(`${ticTacToeDict['mainBoxes'][i]}`).innerHTML = `<img id="junkImage" src="/images/transparent_character.png" alt="">`;
        }

        if (player['clearMe'] == true) {
            document.querySelector('#barImages').querySelector('img').remove();
        }
        YOU['boxes'] = [];
        CPU['boxes'] = [];
        ticTacToeDict['turns'] = false;
        ticTacToeDict['judjment'] = false;

    } else if ((YOU['clearMe'] == true) || (CPU['clearMe'] == true)) {
        ticTacToeDict['mainBoxes'] = ['#r1c1', '#r1c2', '#r1c3', '#r2c1', '#r2c2', '#r2c3', '#r3c1', '#r3c2', '#r3c3'];
        let i;
        for (i in ticTacToeDict['mainBoxes']) {
            document.querySelector(`${ticTacToeDict['mainBoxes'][i]}`).querySelector('img').remove();
            document.querySelector(`${ticTacToeDict['mainBoxes'][i]}`).innerHTML = `<img id="junkImage" src="/images/transparent_character.png" alt="">`;
        }

        if (ticTacToeDict['tictacReset'] == true) {
            document.querySelector('#barImages').querySelector('img').remove();
        }
        YOU['boxes'] = [];
        CPU['boxes'] = [];
        ticTacToeDict['turns'] = false;
        ticTacToeDict['judjment'] = false;
        ticTacToeDict['clearMe'] = false;
    }
}
let myloss = 0; //This is the variable to be increamented anytime there is a loss and thisLoss 
//Variable is set to false;

//This function shows the wins the losses and the draws on the scoreboard 
function showResults() {
    if (thisLoss == true) {
        myloss++;
        thisLoss = false;
    }
    document.querySelector('#loses').innerHTML = `<strong>${myloss}</strong>`;
    document.querySelector('#wins').innerHTML = `<strong>${ticTacToeDict['wins']}</strong>`;
    document.querySelector('#draws').innerHTML = `<strong>${ticTacToeDict['draws']}</strong>`;
}
