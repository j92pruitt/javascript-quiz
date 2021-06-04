var timerDisplay = document.getElementById("timerDisplay");
var quizTime
var quizTimerInterval
var startButton = document.getElementById("startGame");
var mainEl = document.querySelector('main')
var headerEl = document.querySelector('header')

var highscoreLink = document.getElementById("highscores")

// Bank of questions, stored as objects. 
// text is the text of the question
// option1-4 are the potential answers.
// answer is the correct answer.
var questionOne = {
    text : "How do you declare a variable named num with value 5?",
    option1 : "num = 5",
    option2 : "--num = 5",
    option3 : "var num = 5",
    option4 : "var num == 5",
    answer : "var num = 5"
}

var questionTwo = {
    text : "Which type of variable is visible only within a function where it is defined.",
    option1 : "global variable",
    option2 : "local variable",
    option3 : "Both of the above",
    option4 : "Neither of the above",
    answer : "local variable"
}

var questionThree = {
    text : "Which of the following function of String object returns the calling string value converted to upper case?",
    option1 : "toLocaleUpperCase()",
    option2 : "toUpperCase()",
    option3 : "toString()",
    option4 : "substring()",
    answer : "toUpperCase()"
}

var questionFour = {
    text : "Which of the following function of Array object removes the last element from an array and returns that element?",
    option1 : "pop()",
    option2 : "push()",
    option3 : "join()",
    option4 : "map()",
    answer : "pop()"
}


var questionFive = {
    text : "Which of the following is true about variable naming conventions in JavaScript?",
    option1 : "Variable names must begin with a letter or an underscore.",
    option2 : "Variable names are case sensitive.",
    option3 : "Both of the above.",
    option4 : "None of the above.",
    answer : "Both of the above."
}

var questionSix = {
    text : "If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?",
    option1 : '"New Text"?',
    option2 : 'para1.value="New Text";',
    option3 : 'para1.firstChild.nodeValue= "New Text";',
    option4 : 'para1.nodeValue="New Text";',
    answer : 'para1.value="New Text";'
}

var questionSeven = {
    text : "JavaScript is interpreted by _________",
    option1 : "Client",
    option2 : "Server",
    option3 : "Object",
    option4 : "None of the above",
    answer : "Client"
}

var questionEight = {
    text : "The _______ method of an Array object adds and/or removes elements from an array.",
    option1 : "Reverse",
    option2 : "Shift",
    option3 : "Slice",
    option4 : "Splice",
    answer : "Splice"
}
// Array containing all questions, filled with all questions during renderStart.
var questionBank

function startTimer(){
    // Initial timer display
    displayTimer();

    // Create a new interval with callback function that decrements quizTime and displays the new quizTime each second.
    quizTimerInterval = setInterval(function(){
        quizTime--;
        displayTimer();
    }, 1000)
};

function displayTimer() {
    // Check to see if time has run out.
    if (quizTime <= 0) {
        quizTime = 0;
        clearInterval(quizTimerInterval);
        renderDefeat();
    }
    // Update html element that displays time to current game time.
    timerDisplay.textContent = quizTime;
}

function renderQuestion(question) {
    // Clear main element then create and append new h1
    mainEl.innerHTML = "";
    var quizH1 = document.createElement('h1');
    quizH1.textContent = question.text
    mainEl.append(quizH1)

    // Create <ol> element to hold answer buttons
    optionList = document.createElement('ol');
    optionList.setAttribute('type', 'A');
    optionList.setAttribute('class', 'answers')

    // Create and append a button for each answer and append it to the <ol>
    addAnswerButton(question.option1)
    addAnswerButton(question.option2)
    addAnswerButton(question.option3)
    addAnswerButton(question.option4)

    // Append the <ol> and add an event listener that checks for a button press and handles the event.
    mainEl.append(optionList)
    optionList.addEventListener('click', function(event) {

        event.preventDefault()

        if (event.target.nodeName === 'A') {
            // If the answer button clicked is the correct answer move on to the next question.
            if (event.target.textContent === question.answer) {
                // Changes header to green to indicate answer was correct.
                headerEl.style.background = '#008000';
                nextQuestion()
            } else {
                // If the answer button clicked is not the correct answer then deduct 10 seconds and move on to the next question.
                quizTime -= 10
                // Changes header to red to indicate answer was not correct.
                headerEl.style.background = '#FF0000';
                displayTimer()
                if (quizTime > 0) {
                    nextQuestion()
                }
            }
        }
    })
}

//Helper function for `renderQuestion()`. Will error if called outside of `renderQuestion`.
function addAnswerButton(answerText) {
    // Create list element and button.
    var answerli = document.createElement('li');
    var answerButtton = document.createElement('a');
    // Style button using input text
    answerButtton.textContent = answerText;
    answerButtton.setAttribute('href', '#')
    answerButtton.setAttribute('class', 'answerButton')
    // Append button to <li> and then append <li> to <ol>.
    answerli.append(answerButtton);
    optionList.append(answerli)
}

function nextQuestion() {
    // Check to see if there are questions left that haven't been asked.
    if (questionBank.length) {
        // If there are then choose a random question and render it to the screen.
        var i = Math.floor(Math.random()*questionBank.length);
        randomQuestion = questionBank.splice(i, 1)[0];
        renderQuestion(randomQuestion)
    } else{
        // If there are not then end the game with a win.
        clearInterval(quizTimerInterval);
        renderVictory()
    }
}

function renderVictory() {
    // Clear main then create and append new h1.
    mainEl.innerHTML = "";
    var victoryH1 = document.createElement('h1');
    victoryH1.textContent = 'Congratulations!';
    mainEl.append(victoryH1);

    // Create instruction paragraph and append.
    var victoryP = document.createElement('p');
    victoryP.textContent = 'Please enter a name for the leaderboard.';
    mainEl.append(victoryP);

    // Create and append form for inputing name for leaderboard.
    victoryForm = document.createElement('form');
    var highScoreInput = document.createElement('input');
    highScoreInput.setAttribute('type', 'text');
    highScoreInput.setAttribute('id', 'hs-name')
    var highScoreSubmit = document.createElement('input');
    highScoreSubmit.setAttribute('type', 'submit');
    victoryForm.append(highScoreInput);
    victoryForm.append(highScoreSubmit)
    mainEl.append(victoryForm)

    // Event listener for submitting leaderboard name.
    victoryForm.addEventListener('submit', handleSubmit)
}

function renderDefeat() {
    // Clear main then create and append h1
    mainEl.innerHTML = "";
    var defeatH1 = document.createElement('h1');
    defeatH1.textContent = 'Sorry, you ran out of time';
    mainEl.append(defeatH1);

    // Create 'Try Again' button and append it.
    var retryButton = document.createElement('a');
    retryButton.textContent = 'Try Again';
    retryButton.setAttribute('href', '#');
    // Style <a> into custom button using myButton class
    retryButton.setAttribute('class', 'myButton');
    mainEl.append(retryButton);

    // Event listener for restarting quiz.
    retryButton.addEventListener("click", renderStart);
}

function renderStart() {
    // Clears correct/incorrect indicator from previous quiz.
    headerEl.style.background = 'none';

    // Set Quiz Timer to initial time.
    quizTime = 75;
    displayTimer();

    // Initial the bank of potential questions for the game.
    questionBank = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight]

    // Clear main then create and append the header
    mainEl.innerHTML = "";
    var startH1 = document.createElement('h1');
    startH1.textContent = 'Coding Quiz Challenge';
    mainEl.append(startH1);

    // Create and append the instruction paragraph
    var startP = document.createElement('p');
    startP.textContent = 'Try to answer the quiz questions as fast as you can, however being right is better than being fast so each wrong answer will cost you 10 seconds. Try to get the fastest time!';
    mainEl.append(startP);

    // Create the button to start the game.
    var startButton = document.createElement('a');
    startButton.textContent = 'Start Game';
    startButton.setAttribute('href', '#')
    // Adding the correct class to display the <a> tag as a custom button.
    startButton.setAttribute('class', 'myButton')
    // Append the button to the page and add an event listener to `startGame` on click.
    mainEl.append(startButton)
    startButton.addEventListener("click", startGame)
}

// Handles reading user input and adding new highscore to storage.
function handleSubmit(event) {
    event.preventDefault()

    // The text input field of the form
    var userInput = document.getElementById('hs-name').value

    // Check to see if the form input is empty.
    if (userInput.trim() === "") {
        // If form is empty then create new score with name Anon.
        var newHighScore = {
            name : 'Anon',
            score : quizTime
        }
    } else {
        // If form is not empty then create new score with name in input.
        var newHighScore = {
            name : userInput.trim(),
            score : quizTime
        }
    }
    // Get array of highscores from storage.
    var prevLeaderboard = JSON.parse(localStorage.getItem('jpQuizLeaderboard'));
    // Check to see if there are highscores in storage.
    if (prevLeaderboard === null) {
        // If there aren't high scores in storage then create a new array with the new highscore.
        newLeaderboard = JSON.stringify([newHighScore]);
    } else{
        // If there are high scores in storage then add new highscore to array.
        // Check high score list item by item until you find the first score lower than current score and insert current score at that location.
        for (i = 0; i < prevLeaderboard.length; i++) {
            // Check to see if entry has lower score than current.
            if (newHighScore.score > prevLeaderboard[i].score) {
                // If so then insert at that location; then strigify, store, and render. Then return from function.
                prevLeaderboard.splice(i, 0, newHighScore);
                newLeaderboard = JSON.stringify(prevLeaderboard);
                localStorage.setItem('jpQuizLeaderboard', newLeaderboard);
                renderHighScores();
                return
            }
        }

        // Will only be accessed when prev high scores exist and the new highscore is lower than all existing scores. In this case push new score onto end of array and stringify.
        prevLeaderboard.push(newHighScore)
        newLeaderboard = JSON.stringify(prevLeaderboard);
    }

    // Store new highscore list in memory.
    localStorage.setItem('jpQuizLeaderboard', newLeaderboard);
    
    // Display highscores on the page.
    renderHighScores()
}

function renderHighScores() {
    // Clear main then create and append h1.
    mainEl.innerHTML = "";
    var highScoreH1 = document.createElement('h1');
    highScoreH1.textContent = 'The Leaderboard';
    mainEl.append(highScoreH1);

    // Create ol for holding high scores.
    var highScoreList = document.createElement('ol');
    highScoreList.setAttribute('type', '1');
    highScoreList.setAttribute('class', 'highscorelist')

    // Get array highscores from storage.
    var leaderboard = JSON.parse(localStorage.getItem('jpQuizLeaderboard'))

    // Check to see if there are any scores in array.
    if (leaderboard !== null) {
        // If there are scores in array then create an li element for each one and append it to <ol>
        for (i = 0; i < leaderboard.length; i++) {
            var hsItem = document.createElement('li');
            hsItem.textContent = leaderboard[i].name + '  -  ' + leaderboard[i].score;
            highScoreList.append(hsItem);
        }
    }
    // Append <ol> to main
    mainEl.append(highScoreList)

    // Create div for styling buttons via flex box.
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id', 'hs-buttons');
    // Create buttons for high score page.
    var backButton = document.createElement('a');
    var clearButton = document.createElement('a');
    backButton.textContent = 'Go Back';
    clearButton.textContent = 'Clear Scores';
    backButton.setAttribute('href', '#');
    clearButton.setAttribute('href', '#');
    backButton.setAttribute('class', 'answerButton');
    clearButton.setAttribute('class', 'answerButton');
    // Append buttons to div.
    buttonDiv.append(backButton);
    buttonDiv.append(clearButton);

    // Append div to main.
    mainEl.append(buttonDiv);

    backButton.addEventListener('click', renderStart);
    clearButton.addEventListener('click', clearHighScores);
}

function clearHighScores() {
    localStorage.clear();
    renderHighScores();
}

function startGame(event){

    event.preventDefault();

    startTimer();
    nextQuestion();
}

highscoreLink.addEventListener("click", renderHighScores)

renderStart();