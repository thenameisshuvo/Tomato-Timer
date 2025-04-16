import React from 'react';
import Tomatin from './Tomatin';
import Option from './Option';
import './Settings.css';

const Settings = (props) => {
  return (
    <nav id="Settings">
      <aside id="Banner">
        <Tomatin pose="settings" />
        <div className="sidebar-background">
          <h1>
            <strong className="green">Tomato</strong> <br />Timer
          </h1>
        </div>
      </aside>
      <section id="Customize">
        <div className="settings-content">
          <h1>
            Personalize your <strong className="red">Pomodoro Experience</strong>!
          </h1>
          <Option id="session" {...props}>
            <span>Set your <em className="red">Focus Session</em> duration</span>
            <p>
              Define how long each <em>Pomodoro Session</em> should last. You can choose any duration
              <strong className="red"> up to 60 minutes</strong>. Remember, staying focused for too long without breaks can reduce productivity.
            </p>
          </Option>
          <Option id="break" {...props}>
            <span>Customize your <strong className="red">Short Break</strong> time</span>
            <p>
              After each <em>Pomodoro Session</em>, take a short break to recharge. Set the duration
              of your <strong className="red">short break</strong> here. A quick pause can work wonders for your focus!
            </p>
            <p>Need more than 5 minutes? Adjust it to suit your needs!</p>
          </Option>
          <Option id="long-break" {...props}>
            <span>Plan your <strong className="red">Long Break</strong> intervals</span>
            <p>
              A <strong className="red">long break</strong> helps you unwind after completing several
              <em>Pomodoro Sessions</em>. Set the duration of your long break here to ensure you’re fully recharged.
            </p>
          </Option>
          <Option id="total-sessions" {...props}>
            <span>Decide how many <strong className="red">Sessions</strong> before a <em>Long Break</em></span>
            <p>
              Specify how many <em>Pomodoro Sessions</em> you want to complete before taking a long break. This helps you stay consistent and productive.
            </p>
          </Option>
          <Option id="notifications" {...props}>
            <span>Enable <strong className="red">Notifications</strong> for better tracking</span>
            <p>
              Stay on top of your schedule by enabling notifications. Get alerts when a session ends or a break begins.
            </p>
          </Option>
          <Option id="breakTips" {...props}>
            <span>Enable <strong className="red">Break Activity Suggestions</strong></span>
            <p>
              Get small, helpful suggestions during breaks—like stretching, walking, or drinking water—to make your break time more refreshing and intentional.
            </p>
          </Option>
          <button id="save-settings" onClick={() => props.toggleMenu()}>
            SAVE SETTINGS
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Settings;
