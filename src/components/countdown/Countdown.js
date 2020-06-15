import React from 'react';
import { Button, Slider, Progress } from 'antd';
import { Howl } from 'howler';
import CountdownInputTime from '../countdownInputTime/CountdownInputTime';
import audio from './countdown.mp3';
import './countdown.scss';

const sound = new Howl({
  src: [audio],
  loop: true,
});

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      startTime: 0,
      accTime: 0,
      timeInS: 0,
      minutes: 0,
      seconds: 0,
      allTimeSecond: 0,
      onDisabledStart: true,
      onDisabledDisplay: true,
      onDisabledReset: true,
      onDisabledSlider: false,
    };

    /* Slider */
    this.onChangeSlider = (value) => {
      this.setState({
        allTimeSecond: value,
        minutes: parseInt(value / 60, 10),
        seconds: value % 60,
      });
    };
    /* события минуты/секуды */
    this.onChangeMinutes = (value) => {
      this.setState((prevState) => ({
        minutes: value,
        allTimeSecond: prevState.seconds + value * 60,
      }));
    };

    this.onChangeSeconds = (value) => {
      this.setState((prevState) => ({
        seconds: value,
        allTimeSecond: prevState.minutes * 60 + value,
      }));
    };

    /* START */
    this.onClickStart = () => {
      const { active } = this.state;

      if (active) {
        this.intervalId = setInterval(this.run, 60);

        this.setState({
          startTime: Date.now(),
          onDisabledDisplay: false,
          onDisabledReset: false,
          onDisabledSlider: true,
        });
      }

      this.setState({
        active: !active,
      });

      if (!active) {
        clearInterval(this.intervalId);

        this.setState((prevState) => ({
          timeInS: prevState.timeInS,
          accTime: prevState.timeInS,
        }));
      }
    };

    /* RESET */
    this.onClickReset = () => {
      clearInterval(this.intervalId);
      sound.stop();
      this.setState((prevState) => ({
        active: true,
        timeInS: 0,
        accTime: 0,
        allTimeSecond: prevState.allTimeSecond,
        startTime: prevState.startTime,
        onDisabledDisplay: true,
        onDisabledSlider: false,
        onDisabledReset: true,
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
        sound.play();
      }

      this.setState((prevState) => ({
        timeInS: parseInt(prevState.accTime + (Date.now() - prevState.startTime) / 1000, 10),
      }));
    };
  }

  render() {
    const { active } = this.state;
    const { timeInS } = this.state;
    const { allTimeSecond } = this.state;
    const { onDisabledStart } = this.state;
    const { onDisabledDisplay } = this.state;
    const { onDisabledReset } = this.state;
    const { onDisabledSlider } = this.state;
    const { seconds } = this.state;
    const { minutes } = this.state;

    const resMinutes = (full, sec) => parseInt((full - sec) / 60, 10);
    const resSecons = (full, sec) => (full - sec) % 60;
    const resProgress = (full, sec) => parseInt((100 * sec) / full, 10);

    const displayMinutes = resMinutes(allTimeSecond, timeInS);
    const displaySeconds = resSecons(allTimeSecond, timeInS);
    const displayProgress = resProgress(allTimeSecond, timeInS);

    const inputAllowed = allTimeSecond > 0 ? !onDisabledStart : onDisabledStart;

    const changeBtn = active ? 'START' : 'PAUSE';

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
              disabled={onDisabledReset}
            >
              Reset
            </Button>
            <span className="display">
              {displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes}:
              {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
            </span>
          </div>
          <Progress className="countdown-progress" type="circle" percent={displayProgress} />
        </div>
        <div className="countdown-block-input">
          <CountdownInputTime
            onChangeMinutes={this.onChangeMinutes}
            onChangeSeconds={this.onChangeSeconds}
            minutes={minutes}
            seconds={seconds}
            onDisabledDisplay={!onDisabledDisplay}
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
