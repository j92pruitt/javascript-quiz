var timerDisplay = document.getElementById("timerDisplay");
var quizTime
var quizTimerInterval
var startButton = document.getElementById("startGame");


function startTimer(){
    // Initial timer display
    quizTime = 10
    displayTimer();

    // Create a new interval with callback function that decrements quizTime and displays the new quizTime each second.
    quizTimerInterval = setInterval(function(){
        quizTime--;
        if (quizTime === 0) {
            clearInterval(quizTimerInterval);
        }
        displayTimer();
    }, 1000)
};

function displayTimer() {
    timerDisplay.textContent = quizTime;
}

startButton.addEventListener("click", startTimer)