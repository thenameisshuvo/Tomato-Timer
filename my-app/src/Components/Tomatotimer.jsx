import React, { useState } from 'react';
import Settings from './Settings';
import Timer from './Timer';
import Footer from './Footer';
import QuoteDisplay from './QuoteDisplay'; // ✅ Proper component import
import './Tomatotimer.css';
import 'font-awesome/css/font-awesome.min.css';

const TomatoTimer = () => {
  const minutesOnStartUp = 1500000;
  const [timer, setTimer] = useState(minutesOnStartUp);
  const [settings, setSettings] = useState({
    session: minutesOnStartUp,
    break: 300000,
    'long-break': 300000,
    'total-sessions': 50000,
  });
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const resetSettings = () => {
    setTimer(1500000);
    setSettings({
      session: 1500000,
      break: 300000,
      'long-break': 300000,
      'total-sessions': 50000,
    });
  };

  const saveSettings = (option, value) => {
    setSettings((prev) => ({
      ...prev,
      [option]: value,
    }));
    if (option === 'session') {
      setTimer(value);
    }
  };

  const updateTimer = (newTime) => {
    setTimer(newTime);
  };

  return (
    <React.Fragment>
      <section
        id="Timer-Content"
        className={showMenu ? 'contents-box-flex showMenu' : 'contents-box-flex'}
      >
        <header>
          <button id="menu-btn" name="menu" tabIndex="3" onClick={toggleMenu}>
            <i className="fas fa-ellipsis-v" />
          </button>
        </header>

        <Timer
          settings={settings}
          timer={timer}
          updateTimer={updateTimer}
          resetSettings={resetSettings}
        />

        <QuoteDisplay /> {/* ✅ Display motivational quote here */}

        <Footer />
      </section>

      <section
        id="Menu-Content"
        className={showMenu ? 'contents-box-flex showMenu' : 'contents-box-flex'}
      >
        <Settings
          toggleMenu={toggleMenu}
          settings={settings}
          saveSettings={saveSettings}
        />
      </section>
    </React.Fragment>
  );
};

export default TomatoTimer;
