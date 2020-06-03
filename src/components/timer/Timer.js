import React, { useState } from 'react';
import { Button } from 'antd';
import './Timer.scss';
import Display from './Display';

function Timer() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 }); // поставил пока хуки

  const start = () => {
    run();
    setInterval(run, 10);
  };

  let updatedMs = time.ms;
  let updatedS = time.s;
  let updatedM = time.m;

  const run = () => {
    if (updatedS === 60) {
      updatedM += 1;
      updatedS = 0;
    }
    if (updatedMs === 99) {
      updatedS += 1;
      updatedMs = 0;
    }
    updatedMs += 1;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM});
  };
  return (
    <div className="timer-container">
      <div className="timer-button">
        <Button type="primary" className="button" block onClick={start}>
          START
        </Button>
        <Button type="primary" className="button" block>
          RESET
        </Button>
      </div>
      <div className="timer-value" >
        <Display time={time} />
      </div>
    </div>
  );
}

export default Timer;
