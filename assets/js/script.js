var timerDisplay = document.getElementById("timerDisplay");
var quizTime
var quizTimerInterval
var startButton = document.getElementById("startGame");
var mainEl = document.querySelector('main')

var highscoreLink = document.getElementById("highscores")

// Bank of questions, stored as objects. 
// text is the text of the question
// option1-4 are the potential answers.
// answer is the correct answer.
var questionOne = {
    text : "This is a test question.",
    option1 : "Correct",
    option2 : "Not correct",
    option3 : "Really not correct",
    option4 : "Eh, this might be the right answer.",
    answer : "Correct"
}

var questionTwo = {
    text : "What is the meaning of life, the universe, and everything?",
    option1 : "21",
    option2 : "57?",
    option3 : "Greg",
    option4 : "42",
    answer : "42"
}

var questionThree = {
    text : "What is your favorite color.",
    option1 : "Blue, wait nooooooo...",
    option2 : "Yellow",
    option3 : "Orange",
    option4 : "Edgelord Black",
    answer : "Yellow"
}

// Array containing all questions, filled with all questions during renderStart.
var questionBank

function startTimer(){
    // Initial timer display
    quizTime = 75
    displayTimer();

    // Create a new interval with callback function that decrements quizTime and displays the new quizTime each second.
    quizTimerInterval = setInterval(function(){
        quizTime--;
        displayTimer();
    }, 1000)
};

function displayTimer() {
    if (quizTime <= 0) {
        quizTime = 0;
        clearInterval(quizTimerInterval);
        renderDefeat();
    }
    timerDisplay.textContent = quizTime;
}

function renderQuestion(question) {
    mainEl.innerHTML = "";
    var quizH1 = document.createElement('h1');
    quizH1.textContent = question.text
    mainEl.append(quizH1)

    optionList = document.createElement('ul');

    addAnswerButton(question.option1)
    addAnswerButton(question.option2)
    addAnswerButton(question.option3)
    addAnswerButton(question.option4)

    mainEl.append(optionList)
    optionList.addEventListener('click', function(event) {
        if (event.target.nodeName === 'BUTTON') {
            if (event.target.textContent === question.answer) {
                nextQuestion()
            } else {
                quizTime -= 10
                displayTimer()
                nextQuestion()
            }
        }
    })
}

function addAnswerButton(answerText) {
    var answerli = document.createElement('li');
    var answerButtton = document.createElement('button');
    answerButtton.textContent = answerText;
    answerli.append(answerButtton);
    optionList.append(answerli)
}

function nextQuestion() {
    if (questionBank.length) {
        var i = Math.floor(Math.random()*questionBank.length);
        randomQuestion = questionBank.splice(i, 1)[0];
        renderQuestion(randomQuestion)
    } else{
        clearInterval(quizTimerInterval);
        renderVictory()
    }
}

function renderVictory() {
    mainEl.innerHTML = "";
    var victoryH1 = document.createElement('h1');
    victoryH1.textContent = 'Congrats! You completed the quiz';
    mainEl.append(victoryH1);

    var victoryP = document.createElement('p');
    victoryP.textContent = 'Please enter a name for the High Score Board.';
    mainEl.append(victoryP);

    victoryForm = document.createElement('form');
    var highScoreInput = document.createElement('input');
    highScoreInput.setAttribute('type', 'text');
    highScoreInput.setAttribute('id', 'hs-name')
    var highScoreSubmit = document.createElement('input');
    highScoreSubmit.setAttribute('type', 'submit');
    victoryForm.append(highScoreInput);
    victoryForm.append(highScoreSubmit)
    mainEl.append(victoryForm)

    victoryForm.addEventListener('submit', handleSubmit)
}

function renderDefeat() {
    mainEl.innerHTML = "";
    var defeatH1 = document.createElement('h1');
    defeatH1.textContent = 'Sorry you ran out of time';
    mainEl.append(defeatH1);

    var retryButton = document.createElement('button');
    retryButton.textContent = 'Try Again';
    mainEl.append(retryButton);

    retryButton.addEventListener("click", renderStart)
}

function renderStart() {
    // Set Quiz Timer to initial time.
    quizTime = 75;
    displayTimer();

    // Initial the bank of potential questions for the game.
    questionBank = [questionOne, questionTwo, questionThree]

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

function handleSubmit(event) {
    event.preventDefault()

    var userInput = document.getElementById('hs-name').value

    if (userInput.trim() === "") {
        var newHighScore = {
            name : 'Anon',
            score : quizTime
        }
    } else {
        var newHighScore = {
            name : userInput.trim(),
            score : quizTime
        }
    }
    var prevLeaderboard = JSON.parse(localStorage.getItem('jpQuizLeaderboard'));

    if (prevLeaderboard === null) {
        newLeaderboard = JSON.stringify([newHighScore]);
    } else{
        prevLeaderboard.push(newHighScore);
        newLeaderboard = JSON.stringify(prevLeaderboard);
    }

    localStorage.setItem('jpQuizLeaderboard', newLeaderboard);
    
    renderHighScores()
}

function renderHighScores() {
    mainEl.innerHTML = "";
    var highScoreH1 = document.createElement('h1');
    highScoreH1.textContent = 'The Leaderboard';
    mainEl.append(highScoreH1);

    var highScoreList = document.createElement('ul');

    var leaderboard = JSON.parse(localStorage.getItem('jpQuizLeaderboard'))

    if (leaderboard !== null) {
        for (i = 0; i < leaderboard.length; i++) {
            var hsItem = document.createElement('li');
            hsItem.textContent = leaderboard[i].name + '  -  ' + leaderboard[i].score;
            highScoreList.append(hsItem);
        }
    }
    mainEl.append(highScoreList)

    var backButton = document.createElement('button');
    var clearButton = document.createElement('button');
    backButton.textContent = 'Go Back';
    clearButton.textContent = 'Clear Scores';
    mainEl.append(backButton);
    mainEl.append(clearButton);

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