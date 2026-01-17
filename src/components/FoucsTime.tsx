import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function FocusTimer() {
  const [time, setTime] = useState(30); //preset val
  const [running, setRunning] = useState(false);
  const [flash, setFlash] = useState(false);

  //time interval effect
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    //cleanup
    return () => clearInterval(id);
  }, [running]);

  // layout effect
  useLayoutEffect(() => {
    if (time <= 10 && time >= 0) {
      setFlash(true);
      setTimeout(() => setFlash(flash), 500);
    }
  }, [time]);

  //increase size warning
  const [warn, setWarn] = useState("");
  const timeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const width = timeRef.current ? timeRef.current.offsetWidth : 0;
    if (width < 25) {
      setWarn(" Alert!! Warning!!");
    } else {
      setWarn(" ");
    }
  }, [time]);

  //   component
  return (
    <div>
      <h2>Focus Timer</h2>
      <button onClick={() => setRunning(true)}>Start</button> |{" "}
      <button onClick={() => setRunning(false)}>Pause</button> |{" "}
      <button
        onClick={() => {
          setRunning(false);
          setTime(30);
        }}
      >
        Reset
      </button>
      <p
        style={{
          fontSize: flash ? "40px" : "32px",
          color: flash ? "red" : "black",
          transition: "all 0.5s ease",
        }}
      >
        <span ref={timeRef}>{time}</span>s
      </p>
      {warn && <p style={{ color: "red" }}>{warn}</p>}
    </div>
  );
}

export default FocusTimer;
