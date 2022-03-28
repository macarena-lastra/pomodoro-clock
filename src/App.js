import { useState, useEffect } from "react";
import "./styles.scss";

import Button from "./Button.js";
import BlockLength from "./BlockLength.js";
import Footer from "./Footer.js";

export default function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const onSessionAlarm =
    "http://www.cimmerianrecords.com/02%20-%20Anvil%20of%20Crom.mp3";
  const onBreakAlarm =
    "https://takeringtone.com/ring/pop-dance/01/rasputin.mp3";

  useEffect(() => {
    if (displayTime <= 0) {
      setOnBreak(true);
    } else if (!timerOn && displayTime === breakTime) {
      setOnBreak(false);
    }
  }, [displayTime, onBreak, timerOn, breakTime, sessionTime]);

  useEffect(() => {
    if (timerOn) playSound();
  }, [onBreak]);

  const playSound = () => {
    document.getElementById("alarm").currentTime = 0;
    document.getElementById("alarm").play();
  };

  const stopSound = () => {
    document.getElementById("alarm").pause();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) return;
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) return;
      setSessionTime((prev) => prev + amount);
      if (!timerOn) setDisplayTime(sessionTime + amount);
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVar) {
              onBreakVar = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVar) {
              onBreakVar = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    } else {
      stopSound();
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const reset = () => {
    stopSound();
    clearInterval(localStorage.getItem("interval-id"));
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
  };

  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <div id="block-length-settings">
        <BlockLength
          title="Break Length"
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <BlockLength
          title="Session Length"
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <div id="timer">
        <h2 id="timer-label">{onBreak ? "On Break" : "On Session"}</h2>
        <audio id="alarm" src={onBreak ? onBreakAlarm : onSessionAlarm} />
        <p id="time-left" className={displayTime < 60 ? "finalCountdown" : ""}>
          {formatTime(displayTime)}
        </p>
        <div id="control-buttons">
          <Button
            id="start-stop"
            value={timerOn ? "pause" : "run"}
            onClick={controlTime}
            icon={timerOn ? "pause" : "play"}
            btnClass="controls"
          />
          <Button
            id="reset"
            value="reset"
            onClick={reset}
            icon="reset"
            btnClass="controls"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
