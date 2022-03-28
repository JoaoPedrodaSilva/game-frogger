//preventig scroll screen with keyboard
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

const initialScreen = document.querySelector('#initial-screen')
const getReadyScreen = document.querySelector('#get-ready-screen')
const gameScreen = document.querySelector('#game-screen')
const postGameScreen = document.querySelector('#post-game-screen')
const anyDifficultButton = document.querySelectorAll('.difficult-button')
const getReadyDisplay = document.querySelector('#get-ready')
const allSquares = document.querySelectorAll('#grid div')
const upControlButton = document.querySelector('#up')
const rightControlButton = document.querySelector('#right')
const downControlButton = document.querySelector('#down')
const leftControlButton = document.querySelector('#left')
const frogDisplay = document.querySelector('.frog')
const timeLeftDisplay = document.querySelector('#time-left')
const allAlligatorsLeft = document.querySelectorAll('.alligator-left')
const allAlligatorsRight = document.querySelectorAll('.alligator-right')
const allCarsLeft = document.querySelectorAll('.car-left')
const allCarsRight = document.querySelectorAll('.car-right')
const messageDisplay = document.querySelector('#message')
const timeNeededDisplay = document.querySelector('#time-needed')
const playAgainButton = document.querySelector('#play-again')

let timeNeeded
let difficult
let currentTimeLeft
let frogCurrentPosition
let obstaclesMovement


const prepareInitialScreen = () => {
    initialScreen.style.display = 'flex'
    getReadyScreen.style.display = 'none'
    gameScreen.style.display = 'none'
    postGameScreen.style.display = 'none'
    chooseDifficult()
}

const chooseDifficult = () => {
    anyDifficultButton.forEach(button => {
        button.addEventListener('click', event => {
            difficult = event.target.id
            getReady()
        })
    })
}

const getReady = () => {
    initialScreen.style.display = 'none'
    getReadyScreen.style.display = 'flex'
    getReadyDisplay.innerHTML = 3
    setTimeout( () => {getReadyDisplay.innerHTML = 2}, 500)
    setTimeout( () => {getReadyDisplay.innerHTML = 1}, 1000)
    setTimeout( () => {getReadyDisplay.innerHTML = 'GO!'}, 1500)
    setTimeout(startGame, 2000)
}

const startGame = () => {
    resetInitialParameters()
    document.addEventListener('keydown', moveFrogByKeyboard)
    if (difficult == 'easy') {
        obstaclesMovement = setInterval(moveAllObstacles, 1000)   
    } else if (difficult == 'normal') {
        obstaclesMovement = setInterval(moveAllObstacles, 500)   
    } else {
        obstaclesMovement = setInterval(moveAllObstacles, 250)   
    }     
}

const resetInitialParameters = () => {
    getReadyScreen.style.display = 'none'
    gameScreen.style.display = 'flex'
    allSquares.forEach(square => {
        square.classList.remove('frog')
    })     
    clearInterval(obstaclesMovement)
    frogCurrentPosition = 58 // frog initial square
    allSquares[frogCurrentPosition].classList.add('frog')
    upControlButton.disabled = false
    rightControlButton.disabled = false
    downControlButton.disabled = false
    leftControlButton.disabled = false
    messageDisplay.style.color = 'black'
    timeNeeded = 0
    currentTimeLeft = 30
    timeLeftDisplay.innerHTML = currentTimeLeft
    timeNeededDisplay.innerHTML = null
}

const moveFrogByClick = (direction) => {
    //check if desired next position is possible
    if (direction == 'up' && frogCurrentPosition - 9 >= 0) {
        frogCurrentPosition -= 9
    } else if (direction == 'right' && frogCurrentPosition % 9 < 8) {
        frogCurrentPosition += 1
    } else if (direction == 'down' && frogCurrentPosition + 9 < 63) {
        frogCurrentPosition += 9
    } else if (direction == 'left' && frogCurrentPosition % 9 != 0) {
        frogCurrentPosition -= 1       
    }
    
    //clean frog from previous position
    allSquares.forEach(square => {
        square.classList.remove('frog')        
    })
    //move frog to desired position
    allSquares[frogCurrentPosition].classList.add('frog')
    
    checkLose()
    checkWin()
}

const moveFrogByKeyboard = (e) => {
    //check if desired next position is possible
    if (e.key == 'ArrowUp' && frogCurrentPosition - 9 >= 0) {
        frogCurrentPosition -= 9
    } else if (e.key == 'ArrowRight' && frogCurrentPosition % 9 < 8) {
        frogCurrentPosition += 1
    } else if (e.key == 'ArrowDown' && frogCurrentPosition + 9 < 63) {
        frogCurrentPosition += 9
    } else if (e.key == 'ArrowLeft' && frogCurrentPosition % 9 != 0) {
        frogCurrentPosition -= 1       
    }
    
    //clean frog from previous position
    allSquares.forEach(square => {
        square.classList.remove('frog')        
    })
    //move frog to desired position
    allSquares[frogCurrentPosition].classList.add('frog')
    
    checkLose()
    checkWin()
}

const moveAlligatorsLeft = () => {
    allAlligatorsLeft.forEach(alligator => {
        if (alligator.classList.contains('alligator1')) {
            alligator.classList.remove('alligator1')
            alligator.classList.add('alligator2')
        }
        else if (alligator.classList.contains('alligator2')) {
            alligator.classList.remove('alligator2')
            alligator.classList.add('alligator3')
        }
        else if (alligator.classList.contains('alligator3')) {
            alligator.classList.remove('alligator3')
            alligator.classList.add('alligator4')
        }
        else if (alligator.classList.contains('alligator4')) {
            alligator.classList.remove('alligator4')
            alligator.classList.add('alligator5')
        }
        else if (alligator.classList.contains('alligator5')) {
            alligator.classList.remove('alligator5')
            alligator.classList.add('alligator1')
        }        
    })
}

const moveAlligatorsRight = () => {
    allAlligatorsRight.forEach(alligator => {
        if (alligator.classList.contains('alligator5')) {
            alligator.classList.remove('alligator5')
            alligator.classList.add('alligator4')
        }
        else if (alligator.classList.contains('alligator4')) {
            alligator.classList.remove('alligator4')
            alligator.classList.add('alligator3')
        }
        else if (alligator.classList.contains('alligator3')) {
            alligator.classList.remove('alligator3')
            alligator.classList.add('alligator2')
        }
        else if (alligator.classList.contains('alligator2')) {
            alligator.classList.remove('alligator2')
            alligator.classList.add('alligator1')
        }
        else if (alligator.classList.contains('alligator1')) {
            alligator.classList.remove('alligator1')
            alligator.classList.add('alligator5')
        }        
    })
}

const moveCarsLeft = () => {
    allCarsLeft.forEach(car => {
        if (car.classList.contains('car1')) {
            car.classList.remove('car1')
            car.classList.add('car2')
        }
        else if (car.classList.contains('car2')) {
            car.classList.remove('car2')
            car.classList.add('car3')
        }
        else if (car.classList.contains('car3')) {
            car.classList.remove('car3')
            car.classList.add('car1') 
        }     
    })
}

const moveCarsRight = () => {
    allCarsRight.forEach(car => {
        if (car.classList.contains('car3')) {
            car.classList.remove('car3')
            car.classList.add('car2')
        }
        else if (car.classList.contains('car2')) {
            car.classList.remove('car2')
            car.classList.add('car1')
        }
        else if (car.classList.contains('car1')) {
            car.classList.remove('car1')
            car.classList.add('car3') 
        }     
    })
}

const moveAllObstacles = () => {
    timeNeeded++
    currentTimeLeft--
    timeLeftDisplay.innerHTML = currentTimeLeft
    moveAlligatorsLeft()
    moveAlligatorsRight()
    moveCarsLeft()
    moveCarsRight()
    checkLose()
}

const checkLose = () => {
    if (
        allSquares[frogCurrentPosition].classList.contains('car1') ||
        allSquares[frogCurrentPosition].classList.contains('alligator1') ||
        allSquares[frogCurrentPosition].classList.contains('alligator3') ||
        currentTimeLeft == 0
        ) {
        clearInterval(obstaclesMovement)
        document.removeEventListener('keydown', moveFrogByKeyboard)
        upControlButton.disabled = true
        rightControlButton.disabled = true
        downControlButton.disabled = true
        leftControlButton.disabled = true
        gameScreen.style.display = 'none'
        postGameScreen.style.display = 'flex'    
        messageDisplay.innerHTML = 'Oh no...you lost!<br>Try again.'
        messageDisplay.style.color = 'red'
        playAgain()
    }
}

const checkWin = () => {
    if(allSquares[frogCurrentPosition].classList.contains('end')) {
        clearInterval(obstaclesMovement)
        document.removeEventListener('keydown', moveFrogByKeyboard)
        upControlButton.disabled = true
        rightControlButton.disabled = true
        downControlButton.disabled = true
        leftControlButton.disabled = true
        gameScreen.style.display = 'none'
        postGameScreen.style.display = 'flex'    
        messageDisplay.innerHTML = 'Congrats, you won!<br>Can you do even better?'
        messageDisplay.style.color = 'blue'
        timeNeededDisplay.innerHTML = `Time needed: ${timeNeeded} seconds`
        playAgain()
    }
}

const playAgain = () => {
    playAgainButton.addEventListener('click', () => {
        prepareInitialScreen()
    })
}

window.onload = prepareInitialScreen()
