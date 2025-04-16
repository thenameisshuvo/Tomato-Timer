import React from 'react';

const Option = ({ id, children, settings, saveSettings }) => {
  const buttonAttName = id !== 'total-sessions'
    ? `${id} minutes`
    : `the number of sessions before the Long Break`;

  const handleClick = (id, action) => {
    let newValue = 60000;
    let maxValue = 3600000;
    let minValue = 60000;

    if (id === 'total-sessions') {
      newValue = 10000;
      maxValue = 300000;
      minValue = 10000;
    }

    if (action === 'increment' && settings[id] < maxValue) {
      saveSettings(id, settings[id] + newValue);
    } else if (action === 'decrement' && settings[id] > minValue) {
      saveSettings(id, settings[id] - newValue);
    }
  };

  return (
    <div className="time-customizers">
      <div className="setting-desc">
        <h3 id={`${id}-label`}>{children[0]}</h3>
        {children.slice(1)}
      </div>
      <div className="buttons">
        <button
          id={`${id}-decrement`}
          name={`Decrement ${buttonAttName}`}
          tabIndex="-1"
          onClick={() => handleClick(id, 'decrement')}
        >
          <i className="fas fa-minus-square" />
        </button>
        <h2 id={`${id}-length`} className="time-values">
          {id === 'total-sessions' ? settings[id] / 10000 : settings[id] / 60000}
        </h2>
        <button
          id={`${id}-increment`}
          name={`Increment ${buttonAttName}`}
          tabIndex="-1"
          onClick={() => handleClick(id, 'increment')}
        >
          <i className="fas fa-plus-square" />
        </button>
      </div>
    </div>
  );
};

export default Option;
