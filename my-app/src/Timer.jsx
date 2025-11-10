import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(1500); // 25 minutes default
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [inputH, setInputH] = useState(0);
  const [inputM, setInputM] = useState(25);
  const [inputS, setInputS] = useState(0);
  const intervalRef = useRef(null);

  // Format time for display
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeRemainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            alert("Time's up! Great job studying!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemainingSeconds]);

  // Handle start button
  const handleStart = () => {
    if (timeRemainingSeconds > 0) {
      setIsRunning(true);
    } else {
      alert('Please set a new time first.');
    }
  };

  // Handle stop button
  const handleStop = () => {
    setIsRunning(false);
  };

  // Handle reset button
  const handleReset = () => {
    setIsRunning(false);
    setTimeRemainingSeconds(totalTimeSeconds);
  };

  // Handle set timer
  const handleSetTimer = (event) => {
    event.preventDefault();
    const h = parseInt(inputH) || 0;
    const m = parseInt(inputM) || 0;
    const s = parseInt(inputS) || 0;
    const newTotal = h * 3600 + m * 60 + s;

    if (newTotal > 0) {
      setTotalTimeSeconds(newTotal);
      setTimeRemainingSeconds(newTotal);
      setIsRunning(false);
    } else {
      alert('Please enter a valid time.');
    }
  };

  return (
    <div className="timer-container">
      <div className="top-header-bar"></div>

      <div className="timer-display">
        <div id="time-display" className="time-remaining">
          {formatTime(timeRemainingSeconds)}
        </div>
        <div id="total-time-display" className="time-total">
          {Math.floor(totalTimeSeconds / 60)}min
        </div>
      </div>

      <div className="controls-group">
        <button id="reset-btn" onClick={handleReset}>Reset</button>
        <button id="stop-btn" onClick={handleStop}>Stop</button>
        <button
          id="start-btn"
          onClick={handleStart}
          style={{
            backgroundColor: isRunning ? '#2c7da0' : timeRemainingSeconds < totalTimeSeconds ? '#f0ad4e' : '#4CAF50'
          }}
        >
          {isRunning ? 'Running' : timeRemainingSeconds < totalTimeSeconds ? 'Resume' : 'Start'}
        </button>
      </div>

      <form id="set-timer-form" className="new-timer-group" onSubmit={handleSetTimer}>
        <label>New:</label>
        <div className="time-input-fields">
          <input
            type="number"
            id="input-h"
            placeholder="H"
            min="0"
            max="99"
            value={inputH}
            onChange={(e) => setInputH(e.target.value)}
          />
          <input
            type="number"
            id="input-m"
            placeholder="Min"
            min="0"
            max="59"
            value={inputM}
            onChange={(e) => setInputM(e.target.value)}
          />
          <input
            type="number"
            id="input-s"
            placeholder="S"
            min="0"
            max="59"
            value={inputS}
            onChange={(e) => setInputS(e.target.value)}
          />
        </div>
        <button type="submit" id="set-time-btn">SET</button>
      </form>

      <button id="back-btn" onClick={() => window.location.href = '/dashboard'}>
        Back
      </button>
    </div>
  );
}

export default Timer;