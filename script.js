let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll("timer-display");
let session = document.getElementById("pomodoro-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let timerMsg = document.getElementById("timer-message");
let button = document.querySelectorAll(".button");

let  currentTimer = null;
let myInterval = null;

// default timer
function showDefaultTimer() { 
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
    
}

showDefaultTimer();

function hideAll () {  
    timers.forEach(timer => {
        timer.style.display = "none";
    })
}
 
session.addEventListener("click", () => { 
    hideAll();
    pomodoro.style.display = "block";
    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
    
});
shortBreak.addEventListener("click", () => { 
    hideAll();

    short.style.display = "block";
    pomodoro.style.display = "none";

    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
    
});
longBreak.addEventListener("click", () => { 
    hideAll();
    long.style.display = "block";
    pomodoro.style.display = "none";
    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
    
});