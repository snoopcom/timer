import React from 'react';
import { Button, InputNumber, Slider, Progress} from 'antd';

class Countdown extends React.Component {

  state = {
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
    inputValue: 0,
  }

  /* Slider */
  onChangeSlider = (value) => {
    this.setState({
      allTimeSecond: value,
      minutes: parseInt(value / 60),// подсчет минут и отоброжение в инпуте также, как и в табло
      seconds: value % 60, // подсчет секунд и отоброжение в инпуте также, как и в табло
    })
  }
  
  /* события минуты/секуды */
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

  /* START */
  onClickStart = () => {
    const active = this.state.active;
    const allTimeSecond = this.state.active;
    const timeInS = this.state.timeInS;
    
    /* елси true */
    if(active) {
      this.intervalId = setInterval(this.run, 60);

      this.setState((prevState) => ({  
        startTime: Date.now(),
        onDisabledDisplay: false,
        onDisabledReset: false,
        onDisabledSlider: true,
      }));
    }

    this.setState({
      active: !active, // меняем на противоположное
    })

    /* если false */
    if (!active) {
      clearInterval(this.intervalId);

      this.setState((prevState) => ({
        timeInS: prevState.timeInS,
        accTime: prevState.timeInS,
      }));
    }
    
  }

  /* RESET */
  onClickReset = () => {
    clearInterval(this.intervalId);
    this.setState((prevState) => ({
      active: true,
      timeInS: 0, // !!! 
      accTime: 0,
      allTimeSecond: prevState.allTimeSecond,
    //  minutes: 0,
    //  seconds: 0,
      startTime: prevState.startTime,
      onDisabledDisplay: true,
      onDisabledSlider: false,
      onDisabledReset: true,
      onDisabledStart: true,
    }))
  }

  run = () => {
    const timeInS = this.state.timeInS;
    const allTimeSecond = this.state.allTimeSecond;

    /* чтобы не уходило дальше нуля */
    if (timeInS >= allTimeSecond) {
      clearInterval(this.intervalId);
      
      /* отключаем кнопку старт, когда истекло время */
      this.setState({
        // timeInS: 0,
        onDisabledStart: false,
      })
    }
    

    this.setState((prevState) => ({
      timeInS: parseInt(prevState.accTime + (Date.now() - prevState.startTime) / 1000), // !!! prevState.accTime - это предыдущее время, от которго начнется отсчет при нажатии паузы
    }));
  }

  render() {

    const active = this.state.active;
    const timeInS = this.state.timeInS;
    const allTimeSecond = this.state.allTimeSecond;
    const onDisabledStart = this.state.onDisabledStart;
    const onDisabledDisplay = this.state.onDisabledDisplay;
    const onDisabledReset = this.state.onDisabledReset;
    const onDisabledSlider = this.state.onDisabledSlider;
    const seconds = this.state.seconds; //!!! добавим в инпут, чтобы видеть значение в секундах при перемещении ползунка
    const minutes = this.state.minutes; //!!! добавим в инпут, чтобы видеть значение в минутах при перемещении ползунка

    const resMinutes = (full, timeInS) => parseInt((full - timeInS) / 60);
    const resSecons = (full, timeInS) => (full - timeInS) % 60;
    const resProgress = (full, timeInS) => parseInt((100 * timeInS) / full);

    const displayMinutes = resMinutes(allTimeSecond, timeInS);
    const displaySeconds = resSecons(allTimeSecond, timeInS);
    const displayProgress = resProgress(allTimeSecond, timeInS); // прогресс

    /* проверка на ноль */
    const inputAllowed = allTimeSecond > 0 ? !onDisabledStart : onDisabledStart;

    /* меняем START на PAUSE */
    const changeBtn = active ? 'START' : 'PAUSE';
    
    console.log(this.state);
    return (
      <div>
        <div>
          {displayMinutes}:
          {displaySeconds}
        </div>
        <InputNumber min={0} max={60} defaultValue={0} onChange={this.onChangeMinutes} disabled={!onDisabledDisplay} value={minutes} />
        <InputNumber min={0} max={59} defaultValue={0} onChange={this.onChangeSeconds} disabled={!onDisabledDisplay} value={seconds}/>
        <Button onClick={this.onClickStart} disabled={inputAllowed}>{changeBtn}</Button>
        <Button onClick={this.onClickReset} disabled={onDisabledReset}>Reset</Button>
        <Slider min={0} max={3600} onChange={this.onChangeSlider} disabled={onDisabledSlider} />
        <Progress type="circle" percent={displayProgress} />
      </div>
    );
  }
}

export default Countdown;