/**
 *  LET VARIABLE USES...
 *  word -> Word that player needed to guess;
 *  currentGuess -> What did the user guessed;
 *  wordShown -> What the user is seeing on the document;
 *  wins -> Shows how many win;
 *  totalGame -> Keep track of the game count;
 *  wrongGuess -> Keep track of the wrong guess;
 * guessed -> Array of letters that was already guessed (to prevent wasteful guess);
 *
 * CONST VARIABLE USES...
 * guessChance -> Set how many wrong guesses can user have;
 * wordBank -> All the word that user will guess;
 * acceptedKey -> to only captures a-z letters from user's keyboard;
 */

let word = "", currentGuess = "", wordShown = "", wins = 0, totalGame = 0, wrongGuess = 0, guessed = [];
const guessChance = 10;
const wordBank = ["dance", "skip", "jumping", "jack", "shark", "chicken", "alligator", "chair", "robot", "head",
    "smile", "baseball", "bird", "happy", "scissors", "cheek", "back", "jump", "drink", "ice", "cream", "cone", "car",
    "airplane", "clap", "circle", "pillow", "pinch", "kick", "dog", "basketball", "sleep", "camera", "kangaroo", "arm",
    "eat", "prayer", "elephant", "blink", "doll", "spider", "point", "balloon", "book", "glasses", "stop", "sneeze",
    "mouth", "draw", "football", "telephone", "pig", "wave", "door", "tail", "turtle", "baby", "ear", "monkey",
    "hopscotch", "mosquito", "toothbrush", "ring"];
const acceptedKey = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"];

// wait for HTML to finish loading before loading any DOM;
document.addEventListener("DOMContentLoaded", function(){

    // When the user hit the "start" button, the game will start;
    let start = document.getElementById("start");
    start.onclick = startGame;

    // startGame() changes container from main-menu to in-game, updates in-game container, and calls chooseWord();
    function startGame() {
        document.getElementById("user-input").innerText = "";
        document.getElementById("score-board").innerText = "Wins : " + wins + "/" + totalGame + "\tWrong Guess : " + wrongGuess + "/" + guessChance;
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("in-game").style.display = "block";
        chooseWord();
    }

    // chooseWord() randomly choosing the word from wordBank array and setting wordShown;
    function chooseWord() {
        let wordIndex = Math.floor(Math.random() * Math.floor(wordBank.length));
        word = wordBank[wordIndex];
        for(let i = 0; i < word.length; i++)
            wordShown += "_";
        document.getElementById("wordShown").innerText = wordShown;
        console.log(word);
    }

    // get Keyboard's input and constantly update them on the screen;
    document.onkeyup = function (event) {
        let userInput = event.key.toLowerCase();
        if (acceptedKey.includes(userInput)) {
            console.log(userInput);
            currentGuess = userInput;
            document.getElementById("user-input").innerText = currentGuess;
        }
    };

     // submitAnswer is linked to the button where user confirms the answer;
    let submitAnswer = document.getElementById("submitAnswer");
    submitAnswer.onclick = submitAnswerVae;

     // submitAnswerVae() is used to check and update the game after a user has guessed;
    function submitAnswerVae() {
        if(guessed.includes(currentGuess)) {
            return; // for the sake of skipping adding new char to the guessed array at the bottom. Will update later;
        } else if(word.includes(currentGuess)) {
            for(let i = 0; i < wordShown.length; i++) {
                if(word.charAt(i) === currentGuess)
                    wordShown = wordShown.substring(0,i) + currentGuess + wordShown.substring(i+1);
            }
        } else {
            wrongGuess++;
        }
        guessed.push(currentGuess);
        checkCondition();
        updateUserScreen();
    }

    /**
     * CheckCondition() is used to check if user has win or lost yet;
     * If it does, update the score and prompt for "play again";
     */
    function checkCondition() {
        if(wordShown.indexOf("_") === -1) {
            // Game won!
            wins++;
            totalGame++;
            alert("GAME END HERE! code not done!");
            // Prompt for "play again screen";
        }
        if(wrongGuess === guessChance) {
            // Game Lost... ;(
            totalGame++;
            alert("GAME END HERE! code not done!");
            // Prompt for "play again screen";
        }
        document.getElementById("score-board").innerText = "Wins : " + wins + "/" + totalGame + "\tWrong Guess : " + wrongGuess + "/" + guessChance;
    }

    function updateUserScreen() {
        document.getElementById("user-input").innerText = "";
        document.getElementById("score-board").innerText = "Wins : " + wins + "/" + totalGame + "\tWrong Guess : " + wrongGuess + "/" + guessChance;
        document.getElementById("wordShown").innerText = wordShown;
    }
});