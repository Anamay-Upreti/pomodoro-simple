let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll(".timer-display");
let session = document.getElementById("pomodoro-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let timerMsg = document.getElementById("timer-message");

let currentTimer = null;
let myInterval = null;

// Sound file for timer completion
let alarmSound = new Audio('beep.mp3');  // Assuming beep.mp3 is in the same directory

// Show the default Pomodoro timer
function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

showDefaultTimer();

// Hide all timers
function hideAll() {
    timers.forEach((timer) => {
        timer.style.display = "none";
    });
}

// Event listener for Pomodoro session
session.addEventListener("click", () => {
    hideAll();
    pomodoro.style.display = "block";
    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
    currentTimer = pomodoro;
});

// Event listener for short break
shortBreak.addEventListener("click", () => {
    hideAll();
    short.style.display = "block";
    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
    currentTimer = short;
});

// Event listener for long break
longBreak.addEventListener("click", () => {
    hideAll();
    long.style.display = "block";
    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
    currentTimer = long;
});

// Start the timer on click
function startTimer(timerElement) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    // Get user-defined minutes and seconds
    let minutesInput = timerElement.querySelector('input[type="number"]:nth-child(1)');
    let secondsInput = timerElement.querySelector('input[type="number"]:nth-child(3)');

    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    // Validate input
    if (minutes < 0 || seconds < 0 || seconds >= 60) {
        timerMsg.style.display = "block";
        return; // Stop if invalid input
    }

    let durationInSeconds = (minutes * 60) + seconds;
    let endTime = Date.now() + durationInSeconds * 1000;

    myInterval = setInterval(() => {
        let timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(myInterval);
            minutesInput.value = '00';
            secondsInput.value = '00';
            alarmSound.play();
            timerMsg.style.display = "block"; // Show a message when timer is done
        } else {
            let remainingMinutes = Math.floor(timeLeft / 60000);
            let remainingSeconds = Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0');
            minutesInput.value = remainingMinutes;
            secondsInput.value = remainingSeconds;
        }
    }, 1000);
}

// Start button event listener
startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer);
        timerMsg.style.display = "none";
    } else {
        timerMsg.style.display = "block";
    }
});

// Stop button event listener
stopBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval);
    }
});
