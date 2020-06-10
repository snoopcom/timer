import React from 'react';
import { Button, InputNumber } from 'antd';

class Countdown extends React.Component {

  state = {
    active: true,
    startTime: 0,
    accTime: 0,
    timeInS: 0,
    minutes: 0,
    seconds: 0,
    allTimeSecond: 0,
  }

  onChangeMinutes = (value) => {
    this.setState((prevState) => ({
      minutes: value,
      allTimeSecond: prevState.seconds + (value * 60),
    }))
  }
 
  onChangeSeconds = (value) => {
    this.setState((prevState) => ({
      seconds: value,
      allTimeSecond: (prevState.minutes * 60) + value,
    }))
  }

  onClickStart = () => {
    const active = this.state.active;

    if(active) {
      this.intervalId = setInterval(this.run, 60);

      this.setState({
        startTime: Date.now(),
      });
    }

    this.setState({
      active: !active,
    })

    if (!active) {
      clearInterval(this.intervalId);

      this.setState((prevState) => ({
        accTime: prevState.timeInS,
      }));
    }
  }

  run = () => {
    this.setState((prevState) => ({
      timeInS: parseInt( (Date.now() - prevState.startTime) / 1000),
    }));
  }

  render() {
    
    const timeInS = this.state.timeInS;
    const allTimeSecond = this.state.allTimeSecond;

    const resMinutes = (full, timeInS) => parseInt((full - timeInS) / 60);
    const resSecons = (full, timeInS) => (full - timeInS) % 60;

    const displayMinutes = resMinutes(allTimeSecond, timeInS);
    const displaySeconds = resSecons(allTimeSecond, timeInS);
    
    console.log(this.state);
    return (
      <div>
        <div>
          {displayMinutes}:
          {displaySeconds}
        </div>
        <InputNumber min={0} max={60} defaultValue={0} onChange={this.onChangeMinutes}/>
        <InputNumber min={0} max={59} defaultValue={0} onChange={this.onChangeSeconds}/>
        <Button onClick={this.onClickStart}>Start</Button>
        <Button onClick={this.onClickReset}>Reset</Button>
      </div>
    );
  }
}

export default Countdown;