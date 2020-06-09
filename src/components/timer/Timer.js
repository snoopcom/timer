import React from 'react';
import { Button } from 'antd';

import './Timer.scss';

class Timer extends React.Component {

  state = {
    active: true,
    timeInMs: '000',
    accTime: 0,
    startTime: 0,
  }
  
  onClickStart = () => {
    const active = this.state.active;

    if (active) {
      this.intervalId = setInterval(this.run, 60)

      this.setState({
        startTime: Date.now(),
      })
    }

    this.setState({
      active: !active,
    })
    
    if (!active) {
      clearInterval(this.intervalId);

      this.setState((prevState) =>({
        accTime: prevState.timeInMs,
      }))
    }
  }

  run = () => {
    this.setState((prevState) => ({
      timeInMs: prevState.accTime + (Date.now() - prevState.startTime)
    }));
  }

  onClickReset = () => {
    clearInterval(this.intervalId);

    this.setState({
      active: true,
      timeInMs: '000',
      accTime: 0,
      startTime: 0
    });
  }

  render() {
    const { timeInMs, active } = this.state;

    const resMinutes = (ms) => parseInt((ms / (1000 * 60) % 60));
    const resSeconds = (ms) => parseInt((ms / 1000) % 60);
    const resMilliseconds = (ms) => ms.toString().slice(-3, -1);

    const minutes = resMinutes(timeInMs);
    const seconds = resSeconds(timeInMs);
    const milliseconds = resMilliseconds(timeInMs);

    let changeBtn;
    if (active) {
      changeBtn = 'START';
    } else {
      changeBtn = 'PAUSE';
    }

    console.log(this.state);
    return (
      <div className='timer-container'>
        <div className='block-button'>
          <Button className='button' type="primary" onClick={this.onClickStart}>{changeBtn}</Button>
          <Button className='button' type="primary" danger  onClick={this.onClickReset}>RESET</Button>
        </div>
        <span className='display'>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}:
          {milliseconds}
        </span>
      </div>
    );
  }
}

export default Timer;