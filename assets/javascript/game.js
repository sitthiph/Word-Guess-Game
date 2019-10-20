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

let word = "", currentGuess = "a", wordShown = "", wins = 0, totalGame = 0, wrongGuess = 0, guessed = [];
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
        document.getElementById("user-input").innerText = currentGuess; // default input field
        // document.getElementById("score-board").innerText = `Wins : ${wins}` + "Wins : ${wins}" + "/" + totalGame + " Wrong Guess : " + wrongGuess + "/" + guessChance;
        document.getElementById("score-board").innerText = `Wins: ${wins}/${totalGame}  Wrong Guess: ${wrongGuess}/${guessChance}`;
        document.getElementById("guessed-view").innerText = "";
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("in-game").style.display = "block";

        chooseWord();
    }

    // chooseWord() randomly choosing the word from wordBank array and setting wordShown;
    function chooseWord() {
        let wordIndex = Math.floor(Math.random() * Math.floor(wordBank.length));
        word = wordBank[wordIndex];
        for(let i = 0; i < word.length; i++)
          wordShown += "_ ";
        document.getElementById("wordShown").innerText = wordShown;
        // console.log(word);
    }

    // get Keyboard's input and constantly update them on the screen;
    document.onkeyup = function (event) {
        let userInput = event.key.toLowerCase();
        if (acceptedKey.includes(userInput)) {
            // console.log(userInput);
            currentGuess = userInput;
            document.getElementById("user-input").innerText = currentGuess;
        } else if(userInput === "enter") // Make Enter button as a submit button;
            submitAnswerVae();
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
                    wordShown = wordShown.substring(0,i) + currentGuess + wordShown.substring(i+2);
            }
        } else {
            wrongGuess++;
        }
        guessed.push(currentGuess);
        checkCondition();
        updateUserScreen();
    }

    // newGame will create a new game when user clicks the button 
    let newGame = document.getElementById("newGame");
    newGame.onclick = createNewGame;

    // createNewGame will flush current variables but keep total game and wins and start a new game 
    function createNewGame() {
      // let word = "", currentGuess = "a", wordShown = "", wins = 0, totalGame = 0, wrongGuess = 0, guessed = [];
      word = "";
      wordShown = "";
      wrongGuess = 0;
      guessed = [];
      
      startGame();
    }

    /**
     * CheckCondition() is used to check if user has win or lost yet;
     * If it does, update the score and prompt for "play again";
     */
    function checkCondition() {
        if(wordShown.indexOf("_") === -1) {
            // Game won! :)
            wins++;
            totalGame++;
            document.getElementById("text-in-modal0").innerText = "That's right! the word is " + word + ".";
            word = ""; currentGuess = ""; wordShown = ""; wrongGuess = 0; guessed = [];
            $('#game-won-modal').modal({backdrop: 'static', keyboard: false});
        }
        if(wrongGuess === guessChance) {
            // Game Lost... ;(
            totalGame++;
            document.getElementById("text-in-modal1").innerText = "Aweee... The word is actually " + word + ".";
            word = ""; currentGuess = ""; wordShown = ""; wrongGuess = 0; guessed = [];
            $('#game-lost-modal').modal({backdrop: 'static', keyboard: false});
        }
        // document.getElementById("score-board").innerText = `Wins: ${wins}/${totalGame}  Wrong Guess: ${wrongGuess}/${guessChance}`;
    }

    // updateUserScreen() update scores, user input, and the word shown to user;
    function updateUserScreen() {
        // document.getElementById("user-input").innerText = "";
        document.getElementById("score-board").innerText = `Wins: ${wins}/${totalGame}  Wrong Guess: ${wrongGuess}/${guessChance}`;
        document.getElementById("wordShown").innerText = wordShown;
        document.getElementById("guessed-view").innerText = "Letter already guessed : " + guessed;
    }

    // Clear everything and switch back to Main-Menu screen;
    $(".back-to-main-menu").click(function(){
        $("#game-won-modal").modal("hide");
        $("#game-lost-modal").modal("hide");
        document.getElementById("in-game").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
    });

    // Play again;
    $(".play-again").click(function () {
        $("#game-won-modal").modal("hide");
        $("#game-lost-modal").modal("hide");
        createNewGame();
    });
});
