var timerDisplay = document.getElementById("timerDisplay");
var quizTime
var quizTimerInterval
var startButton = document.getElementById("startGame");
var mainEl = document.querySelector('main')

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

// Array containing all questions
var questionBank = [questionOne, questionTwo, questionThree]

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
    quizH1 = document.createElement('h1');
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
                console.log('Correct!')
                nextQuestion()
            } else {
                console.log('Wrong Answer!')
                quizTime -= 10
                displayTimer()
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

function nextQuestion(){
    if (questionBank.length) {
        var i = Math.floor(Math.random()*questionBank.length);
        randomQuestion = questionBank.splice(i, 1)[0];
        console.log(questionBank)
        renderQuestion(randomQuestion)
    } else{
        clearInterval(quizTimerInterval);
        renderVictory()
    }
}

function renderVictory(){
    mainEl.innerHTML = "";
    var victoryH1 = document.createElement('h1');
    victoryH1.textContent = 'Congrats! You completed the quiz';
    mainEl.append(victoryH1);

    victoryP = document.createElement('p');
    victoryP.textContent = 'Please enter a name for the High Score Board.';
    mainEl.append(victoryP);

    victoryForm = document.createElement('form');
    highScoreInput = document.createElement('input');
    highScoreInput.setAttribute('type', 'text');
    highScoreSubmit = document.createElement('input');
    highScoreSubmit.setAttribute('type', 'submit');
    victoryForm.append(highScoreInput);
    victoryForm.append(highScoreSubmit)
    mainEl.append(victoryForm)
}

function renderDefeat(){
    mainEl.innerHTML = ""
    var defeatH1 = document.createElement('h1');
    defeatH1.textContent = 'Sorry you ran out of time';
    mainEl.append(defeatH1);

    retryButton = document.createElement('button');
    retryButton.textContent = 'Try Again';
    mainEl.append(retryButton);
}

function startGame(){
    startTimer();
    nextQuestion();
}

startButton.addEventListener("click", startGame)