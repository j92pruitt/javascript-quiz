var timerDisplay = document.getElementById("timerDisplay");
var quizTime = 10;


function startTimer(){
    // Initial timer display
    timerDisplay.textContent = quizTime;

    // Create a new interval with callback function that decrements quizTime and displays the new quizTime each second.
    quizTimerInterval = setInterval(function(){
        quizTime--;
        if (quizTime === 0) {
            clearInterval(quizTimerInterval);
        }
        timerDisplay.textContent = quizTime;
    }, 1000)
};

startTimer();