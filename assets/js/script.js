var timerDisplay = document.getElementById("timerDisplay");
var quizTime
var quizTimerInterval
var startButton = document.getElementById("startGame");
var mainEl = document.querySelector('main')

var testQuestion = {
    text : "This is a test question.",
    option1 : "Correct",
    option2 : "Not correct",
    option3 : "Really not correct",
    option4 : "Eh, this might be the right answer.",
    answer : "Correct"
}


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
    }
    timerDisplay.textContent = quizTime;
}

function sceneChangeQuiz(question) {
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

function startGame(){
    startTimer();
    sceneChangeQuiz(testQuestion);
}

startButton.addEventListener("click", startGame)