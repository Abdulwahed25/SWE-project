const timeDisplay = document.getElementById('time-display');
const totalTimeDisplay = document.getElementById('total-time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const form = document.getElementById('set-timer-form');
const inputH = document.getElementById('input-h');
const inputM = document.getElementById('input-m');
const inputS = document.getElementById('input-s');

let interval;
let totalTimeSeconds = 1500;
let timeRemainingSeconds = 1500;

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(timeRemainingSeconds);
  totalTimeDisplay.textContent = `${Math.floor(totalTimeSeconds / 60)}min`;
}

function countdown() {
  if (timeRemainingSeconds <= 0) {
    clearInterval(interval);
    interval = null;
    alert("Time's up! Great job studying!");
    timeRemainingSeconds = 0;
    updateDisplay();
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = '#4CAF50';
    return;
  }
  timeRemainingSeconds--;
  updateDisplay();
}

function setTimer(event) {
  event.preventDefault();
  const h = parseInt(inputH.value) || 0;
  const m = parseInt(inputM.value) || 0;
  const s = parseInt(inputS.value) || 0;
  const newTotal = h * 3600 + m * 60 + s;

  if (newTotal > 0) {
    totalTimeSeconds = newTotal;
    timeRemainingSeconds = newTotal;
    updateDisplay();
    clearInterval(interval);
    interval = null;
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = '#4CAF50';
  } else {
    alert('Please enter a valid time.');
  }
}

startBtn.addEventListener('click', () => {
  if (!interval && timeRemainingSeconds > 0) {
    interval = setInterval(countdown, 1000);
    startBtn.textContent = 'Running';
    startBtn.style.backgroundColor = '#2c7da0';
  } else if (timeRemainingSeconds === 0) {
    alert('Please set a new time first.');
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  startBtn.textContent = 'Resume';
  startBtn.style.backgroundColor = '#f0ad4e';
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  timeRemainingSeconds = totalTimeSeconds;
  updateDisplay();
  startBtn.textContent = 'Start';
  startBtn.style.backgroundColor = '#4CAF50';
});

form.addEventListener('submit', setTimer);
updateDisplay();