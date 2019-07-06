let word, currentGuess, userView, wins = 0, totalGame = 0, wrongGuess = 0;
const guessChance = 10;
const wordBank = ["dance", "skip", "jumping", "jack", "shark", "chicken", "alligator", "chair", "robot", "head",
    "smile", "baseball", "bird", "happy", "scissors", "cheek", "back", "jump", "drink", "ice", "cream", "cone", "car",
    "airplane", "clap", "circle", "pillow", "pinch", "kick", "dog", "basketball", "sleep", "camera", "kangaroo", "arm",
    "eat", "prayer", "elephant", "blink", "doll", "spider", "point", "balloon", "book", "glasses", "stop", "sneeze",
    "mouth", "draw", "football", "telephone", "pig", "wave", "door", "tail", "turtle", "baby", "ear", "monkey",
    "hopscotch", "mosquito", "toothbrush", "ring"];
const acceptedKey = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"];
let guessed = [];

// wait for HTML to finish loading before loading any DOM.
document.addEventListener("DOMContentLoaded", function(){

    function chooseWord() {
        let wordIndex = Math.floor(Math.random() * Math.floor(wordBank.length));
        word = wordBank[wordIndex];
        alert(word);
        for(let i = 0; i < word.length; i++)
            userView += "_";
    }

    let keyPressed = document.getElementById("onKeyListen");
    keyPressed.onkeyup = function (event) {
        let userInput = event.key.toLowerCase();
        if (acceptedKey.includes(userInput)) {
            console.log(userInput);
            currentGuess = userInput;
        }
    };

     // submitAnswer is linked to the button where user confirms the answer;
    let submitAnswer = document.getElementById("submitAnswer");
    submitAnswer.onclick = submitAnswerVae;

     // submitAnswerVae() is used to check and update the game after a user has guessed;
    function submitAnswerVae() {
        if(guessed.includes(currentGuess)) {
            return; // for the sake of skipping adding new char to the guessed array at the bottom;
        } else if(word.includes(currentGuess)) {
            for(let i = 0; i < userView.length; i++) {
                if(word.charAt(i) === currentGuess)
                    userView = userView.substring(0,i) + currentGuess + userView.substring(i+1);
            }
        } else {
            wrongGuess++;
        }
        guessed.push(currentGuess);
        checkCondition();
    }

    /**
     * CheckCondition() is used to check if user has win or lost yet;
     * If it does, update the score and prompt for "play again";
     */
    function checkCondition() {
        if(!userView.contains("_")) {
            // Game won!
            wins++;
            totalGame++;
        }
        if(wrongGuess === guessChance) {
            // Game Lost... ;(
            totalGame++;
        }
        // Prompt for "play again screen";
    }
});