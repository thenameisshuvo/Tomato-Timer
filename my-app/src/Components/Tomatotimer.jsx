import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import Timer from './Timer';
import Footer from './Footer';
import QuoteDisplay from './QuoteDisplay';
import './Tomatotimer.css';
import 'font-awesome/css/font-awesome.min.css';
import { getRandomTip } from '../utils/breakTips'; // Import break tips utility

const TomatoTimer = () => {
  const minutesOnStartUp = 1500000;
  const [timer, setTimer] = useState(minutesOnStartUp);
  const [settings, setSettings] = useState({
    session: minutesOnStartUp,
    break: 300000,
    'long-break': 300000,
    'total-sessions': 50000,
    notifications: false, // Added notifications setting
    breakTips: false, // Added break tips setting
  });
  const [showMenu, setShowMenu] = useState(false);
  const [currentTip, setCurrentTip] = useState(''); // State for break tips
  const [showTip, setShowTip] = useState(false); // State to control tip visibility

  // Initialize notifications permission
  useEffect(() => {
    if (settings.notifications && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, [settings.notifications]);

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
      notifications: false,
      breakTips: false,
    });
    setShowTip(false); // Hide tip on reset
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

  // Function to handle timer state changes (session to break and vice versa)
  const handleTimerStateChange = (isSession) => {
    if (isSession) {
      // Session ending, break starting
      if (settings.notifications) {
        new Notification("Time for a break!", {
          body: "Take some time to recharge",
          icon: "../Assets/tomato.png"
        });
      }
      
      if (settings.breakTips) {
        setCurrentTip(getRandomTip());
        setShowTip(true);
      }
    } else {
      // Break ending, session starting
      if (settings.notifications) {
        new Notification("Back to work!", {
          body: "Focus time starts now",
          icon: "../Assets/tomato.png"
        });
      }
      setShowTip(false);
    }
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
          onTimerStateChange={handleTimerStateChange} // Pass the handler to Timer
          currentTip={showTip ? currentTip : null} // Pass tip to Timer if visible
        />

        <QuoteDisplay />

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