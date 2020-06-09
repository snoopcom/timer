import React from 'react';
import { InputNumber, Button } from 'antd';

class Countdown extends React.Component {
  state = { 
    active: true, 
    timeInS: '000',
    accTime: 180000, // общее заданное время 
    startTime: 0, 
    disabled: true, // свойство активноасти окошка
  }

  onClickStart = () => {
    const active = this.state.active;
    /* если active */
    if (active) {
      this.intervalId = setInterval(this.run, 60);

      this.setState({
        startTime: Date.now(),
      });
    }

    this.setState({
      active: !active,
    })

    /* если не active */
    if (!active) {
      clearInterval(this.intervalId);

      this.setState((prevState) => ({
        accTime: prevState.timeInS,
      }));
    }
  }
  /* ресет */
  onClickReset = () => {
    clearInterval(this.intervalId);

    this.setState({
      active: true, //
      timeInS: '000',
      accTime: 180000, // общее заданное время 
      startTime: 0, 
    })
  }

  run = () => {
    this.setState((prevState) => ({
      timeInS: prevState.accTime - (Date.now() - prevState.startTime),
    }))
  }
  /* функция из библиотеки ант */
  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };
  
  render() {
    const timeInS  = this.state.timeInS;
    
    const resMinutes = (ms) => parseInt((ms / (1000 * 60) % 60));
    const resSecundes = (ms) => parseInt((ms / 1000) % 60);
    
    const secundes = resSecundes(timeInS);
    const minutes = resMinutes(timeInS);

    console.log(this.state);

    return (
      <div>
        <span>
          {minutes}:
        </span>
        <span>
          {secundes}
        </span>
        <div>
          <Button onClick={this.onClickStart}>START</Button>
          <Button onClick={this.onClickReset}>RESET</Button>
        </div>
        <div>
        <div>
          <InputNumber min={0} max={60} disabled={this.state.disabled} defaultValue={0} />
          <div style={{ marginTop: 20 }}>
            <Button onClick={this.toggle} type="primary">
              Toggle disabled
            </Button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Countdown;
