import React from 'react';

const MINUTE = 60000;
const SESSION_UNIT = 10000;

const Option = ({ id, children, settings, saveSettings }) => {
  const isTotalSessions = id === 'total-sessions';
  const isToggle = id === 'notifications' || id === 'breakTips';

  const buttonAttName = isTotalSessions
    ? `the number of sessions before the Long Break`
    : `${id} minutes`;

  const handleClick = (action) => {
    const step = isTotalSessions ? SESSION_UNIT : MINUTE;
    const maxValue = isTotalSessions ? 300000 : 3600000;
    const minValue = isTotalSessions ? SESSION_UNIT : MINUTE;

    const currentValue = settings[id];
    let newValue = currentValue;

    if (action === 'increment' && currentValue < maxValue) {
      newValue += step;
    } else if (action === 'decrement' && currentValue > minValue) {
      newValue -= step;
    }

    if (newValue !== currentValue) {
      saveSettings(id, newValue);
    }
  };

  const handleToggle = () => {
    saveSettings(id, !settings[id]);
  };

  const displayValue = isTotalSessions
    ? settings[id] / SESSION_UNIT
    : settings[id] / MINUTE;

  return (
    <div className="time-customizers">
      <div className="setting-desc">
        <h3 id={`${id}-label`}>{children[0]}</h3>
        {children.slice(1)}
      </div>

      <div className="buttons">
        {isToggle ? (
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings[id]}
              onChange={handleToggle}
              aria-label={`Toggle ${id}`}
            />
            <span className="slider" />
          </label>
        ) : (
          <>
            <button
              id={`${id}-decrement`}
              name={`Decrement ${buttonAttName}`}
              tabIndex="-1"
              onClick={() => handleClick('decrement')}
            >
              <i className="fas fa-minus-square" />
            </button>
            <h2 id={`${id}-length`} className="time-values">
              {displayValue}
            </h2>
            <button
              id={`${id}-increment`}
              name={`Increment ${buttonAttName}`}
              tabIndex="-1"
              onClick={() => handleClick('increment')}
            >
              <i className="fas fa-plus-square" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Option;
