import React from 'react';
import { Button } from 'antd';
import './timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      timeInMs: '000',
      accTime: 0,
      startTime: 0,
    };

    this.onClickStart = () => {
      const { active } = this.state;

      if (active) {
        this.intervalId = setInterval(this.run, 60);

        this.setState({
          startTime: Date.now(),
        });
      }

      this.setState({
        active: !active,
      });

      if (!active) {
        clearInterval(this.intervalId);

        this.setState((prevState) => ({
          accTime: prevState.timeInMs,
        }));
      }
    };

    this.run = () => {
      this.setState((prevState) => ({
        timeInMs: prevState.accTime + (Date.now() - prevState.startTime),
      }));
    };

    this.onClickReset = () => {
      clearInterval(this.intervalId);

      this.setState({
        active: true,
        timeInMs: '000',
        accTime: 0,
        startTime: 0,
      });
    };
  }

  render() {
    const { timeInMs, active } = this.state;

    const resMinutes = (ms) => parseInt((ms / (1000 * 60)) % 60, 10);
    const resSeconds = (ms) => parseInt((ms / 1000) % 60, 10);
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

    return (
      <div className="timer-container">
        <div className="button-block-timer">
          <Button className="button_timer" type="primary" onClick={this.onClickStart}>
            {changeBtn}
          </Button>
          <Button className="button_timer" type="primary" danger onClick={this.onClickReset}>
            RESET
          </Button>
        </div>
        <span className="display-timer">
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}:
          {milliseconds}
        </span>
      </div>
    );
  }
}

export default Timer;
