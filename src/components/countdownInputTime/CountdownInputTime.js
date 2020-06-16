import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import './CountdownInputTime.scss';

const CountdownInputTime = (props) => {
  const { onDisabledDisplay, minutes, seconds, onChangeMinutes, onChangeSeconds, maxMinutes } = props;
  return (
    <div className="input-container">
      <div className="input-container_item"> 
        <span className="input_header">Minutes</span>
        <InputNumber
          className="input_item"
          min={0}
          max={maxMinutes}
          defaultValue={0}
          onChange={onChangeMinutes}
          disabled={onDisabledDisplay}
          value={minutes}
        />
      </div>
      <div className="input-container_item">
        <span className="input_header">Seconds</span>
        <InputNumber
          className="input_item"
          min={0}
          max={59}
          defaultValue={0}
          onChange={onChangeSeconds}
          disabled={minutes >= maxMinutes ? !onDisabledDisplay : onDisabledDisplay}
          value={seconds}
        />
      </div>
    </div>
  );
};

CountdownInputTime.defaultProps = {
  onDisabledDisplay: true,
  minutes: 0,
  seconds: 0,
  maxMinutes: 720,
};

CountdownInputTime.propTypes = {
  onDisabledDisplay: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  maxMinutes: PropTypes.number,
  onChangeMinutes: PropTypes.func.isRequired,
  onChangeSeconds: PropTypes.func.isRequired,
};

export default CountdownInputTime;
