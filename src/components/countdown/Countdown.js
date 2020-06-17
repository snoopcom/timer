import React from 'react';
import { Button, Slider, Progress } from 'antd';
import CountdownInputTime from '../countdownInputTime/CountdownInputTime';
import './Countdown.scss';

const pathSound = require('../../assets/Countdown.mp3');

const initState = {
  isActive: true,
  isInactive: true,
  startTime: 0,
  currentTime: 0,
  timeInS: 0,
  minutes: 0,
  seconds: 0,
  allTimeSecond: 0,
  onDisabledStart: true,
  // onDisabledDisplay: true,
  // onDisabledReset: true,
  onDisabledSlider: false,
};

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = initState;

    this.sound = new Audio(pathSound);
    this.sound.loop = true;

    /* Slider */
    this.onChangeSlider = (value) => {
      this.setState({
        allTimeSecond: value,
        minutes: parseInt(value / 60, 10),
        seconds: value % 60,
      });
    };

    /* минуты */
    this.onChangeMinutes = (value) => {
      const { minutes, allTimeSecond } = this.state;

      /* чтобы не уходило за 720 */
      if (allTimeSecond > minutes) {
        this.setState({
          seconds: 0,
        });
      }

      this.setState((prevState) => ({
        minutes: value,
        allTimeSecond: prevState.seconds + value * 60,
      }));
    };

    /* секуды */
    this.onChangeSeconds = (value) => {
      this.setState((prevState) => ({
        seconds: value,
        allTimeSecond: prevState.minutes * 60 + value,
      }));
    };

    /* START */
    this.onClickStart = () => {
      const { isActive } = this.state;

      if (isActive) {
        this.intervalId = setInterval(this.run, 60);

        this.setState({
          startTime: Date.now(),
          isInactive: false,
          isActive: true,
          //onDisabledReset: false,
          onDisabledSlider: true,
        });
      }

      this.setState({
        isActive: !isActive,
      });

      if (!isActive) {
        clearInterval(this.intervalId);

        this.setState((prevState) => ({
          isInactive: false,
          timeInS: prevState.timeInS,
          currentTime: prevState.timeInS,
        }));
      }
    };

    /* RESET */
    this.onClickReset = () => {
      clearInterval(this.intervalId);
      this.sound.load();
      this.setState((prevState) => ({
        isActive: true,
        isInactive: true,
        timeInS: 0,
        currentTime: 0,
        allTimeSecond: prevState.allTimeSecond,
        startTime: prevState.startTime,
        // onDisabledDisplay: true,
        onDisabledSlider: false,
        // onDisabledReset: true,
        onDisabledStart: true,
      }));
    };

    this.run = () => {
      const { timeInS } = this.state;
      const { allTimeSecond } = this.state;

      if (timeInS >= allTimeSecond) {
        clearInterval(this.intervalId);

        this.setState({
          onDisabledStart: false,
        });
        this.sound.play();
      }

      this.setState((prevState) => ({
        timeInS: parseInt(prevState.currentTime + (Date.now() - prevState.startTime) / 1000, 10),
      }));
    };

    /* форматирование времени */
    this.timeFormatting = () => {
      const { allTimeSecond, timeInS } = this.state;

      const resMinutes = parseInt((allTimeSecond - timeInS) / 60, 10);
      const resSecons = (allTimeSecond - timeInS) % 60;

      return `${resMinutes < 10 ? `0${resMinutes}` : resMinutes}:${
        resSecons < 10 ? `0${resSecons}` : resSecons
      }`;
    };

    /* демонстрация прогресса */
    this.demonstrationoOfProgress = () => {
      const { allTimeSecond, timeInS } = this.state;
      const resProgress = parseInt((100 * timeInS) / allTimeSecond, 10);
      return resProgress;
    };
  }

  render() {
    const {
      isActive,
      isInactive,
      allTimeSecond,
      onDisabledStart,
      onDisabledDisplay,
      onDisabledReset,
      onDisabledSlider,
      seconds,
      minutes,
    } = this.state;

    const inputAllowed = allTimeSecond > 0 ? !onDisabledStart : onDisabledStart;

    const changeBtn = isActive ? 'START' : 'PAUSE';

    console.log(this.state);

    return (
      <div>
        <div className="countdown-btn-progress">
          <div className="block-button">
            <Button
              type="primary"
              className="button_countdown"
              onClick={this.onClickStart}
              disabled={inputAllowed}
            >
              {changeBtn}
            </Button>
            <Button
              danger
              type="primary"
              className="button_countdown"
              onClick={this.onClickReset}
              disabled={isInactive}
            >
              Reset
            </Button>
            <span className="display">{this.timeFormatting()}</span>
          </div>
          <Progress
            className="countdown-progress"
            type="circle"
            percent={this.demonstrationoOfProgress()}
          />
        </div>
        <div className="countdown-block-input">
          <CountdownInputTime
            isInactive={isInactive}
            onChangeMinutes={this.onChangeMinutes}
            onChangeSeconds={this.onChangeSeconds}
            minutes={minutes}
            seconds={seconds}
            // onDisabledDisplay={!onDisabledDisplay}
          />
        </div>
        <div className="countdown-slider">
          <Slider
            step={15}
            min={0}
            max={3600}
            onChange={this.onChangeSlider}
            disabled={onDisabledSlider}
            value={allTimeSecond}
          />
        </div>
      </div>
    );
  }
}

export default Countdown;
