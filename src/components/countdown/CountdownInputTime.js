import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';

const CountdownInputTime = (props) => {
  const { onDisabledDisplay, minutes, seconds, onChangeMinutes, onChangeSeconds } = props;
  return (
    <div className="input-container">
      <div>
        <span>Minutes</span>
        <InputNumber
          className="input-container_item"
          min={0}
          max={720}
          defaultValue={0}
          onChange={onChangeMinutes}
          disabled={onDisabledDisplay}
          value={minutes}
        />
      </div>
      <div>
        <span>Seconds</span>
        <InputNumber
          className="input-container_item"
          min={0}
          max={59}
          defaultValue={0}
          onChange={onChangeSeconds}
          disabled={onDisabledDisplay}
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
};

CountdownInputTime.propTypes = {
  onDisabledDisplay: PropTypes.bool,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  onChangeMinutes: PropTypes.func.isRequired,
  onChangeSeconds: PropTypes.func.isRequired,
};

export default CountdownInputTime;