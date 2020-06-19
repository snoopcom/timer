import React from 'react';
import { Button } from 'antd';
import './Timer.scss';

const initState = {
  isActive: true,
  timeInMs: 0,
  currentTime: 0,
  startTime: 0,
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = initState;

    this.onClickStart = () => {
      const { isActive } = this.state;

      if (isActive) {
        this.intervalId = setInterval(this.timerStart, 60);

        this.setState({
          startTime: Date.now(),
        });
      }

      this.setState({
        isActive: !isActive,
      });

      if (!isActive) {
        clearInterval(this.intervalId);

        this.setState((prevState) => ({
          currentTime: prevState.timeInMs,
        }));
      }
    };

    this.timerStart = () => {
      this.setState((prevState) => ({
        timeInMs: prevState.currentTime + (Date.now() - prevState.startTime),
      }));
    };

    this.onClickReset = () => {
      clearInterval(this.intervalId);

      this.setState({
        isActive: true,
        timeInMs: 0,
        currentTime: 0,
        startTime: 0,
      });
    };

    /* форматирование времени */
    this.timeFormatting = () => {
      const { timeInMs } = this.state;

      const minutes = Math.floor(timeInMs / 1000 / 60);
      const seconds = Math.floor(timeInMs / 1000 - minutes * 60);
      const milliseconds = (timeInMs - minutes * 60 * 1000 - seconds * 1000) / 10;
      const resMilliseconds = Math.floor(milliseconds);

      return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}:${
        resMilliseconds < 10 ? `0${resMilliseconds}` : resMilliseconds
      }`;
    };
  }

  render() {
    const { isActive } = this.state;

    const btnName = isActive ? 'START' : 'PAUSE';

    return (
      <div className="timer-container">
        <div className="button-block-timer">
          <Button className="button_timer" type="primary" onClick={this.onClickStart}>
            {btnName}
          </Button>
          <Button className="button_timer" type="primary" danger onClick={this.onClickReset}>
            RESET
          </Button>
        </div>
        <span className="display-timer">{this.timeFormatting()}</span>
      </div>
    );
  }
}

export default Timer;
