import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import './CountdownInputTime.scss';

const CountdownInputTime = (props) => {
  const { isInactive, minutes, seconds, onChangeMinutes, onChangeSeconds, maxMinutes } = props;

  /* отключаем инпут с секундами, если 720 минут */
  const timeMaxInMinutes = () => {
    return minutes >= maxMinutes ? isInactive : !isInactive;
  };

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
          disabled={!isInactive}
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
          disabled={timeMaxInMinutes()}
          value={seconds}
        />
      </div>
    </div>
  );
};

CountdownInputTime.defaultProps = {
  isInactive: true,
  minutes: 0,
  seconds: 0,
  maxMinutes: 720,
};

CountdownInputTime.propTypes = {
  isInactive: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  maxMinutes: PropTypes.number,
  onChangeMinutes: PropTypes.func.isRequired,
  onChangeSeconds: PropTypes.func.isRequired,
};

export default CountdownInputTime;
