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
    currentTimer = pomodoro.querySelector('.time');
});

// Event listener for short break
shortBreak.addEventListener("click", () => {
    hideAll();
    short.style.display = "block";
    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
    currentTimer = short.querySelector('.time');
});

// Event listener for long break
longBreak.addEventListener("click", () => {
    hideAll();
    long.style.display = "block";
    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
    currentTimer = long.querySelector('.time');
});

// Start the timer on click
function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timerDuration = timerDisplay.parentElement.getAttribute("data-duration");
    let durationInMinutes = parseFloat(timerDuration) * 60;
    let endTime = Date.now() + durationInMinutes * 1000;

    myInterval = setInterval(() => {
        let timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";
            const alarm = new Audio(
                "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
            );
            alarm.play();
        } else {
            let minutes = Math.floor(timeLeft / 60000);
            let seconds = Math.floor((timeLeft % 60000) / 1000).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
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
