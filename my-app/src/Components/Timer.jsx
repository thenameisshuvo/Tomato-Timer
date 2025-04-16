import React, { Component } from 'react';
import Tomatin from './Tomatin';
import audioFile from '../Assets/Beep.wav';
import './Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.intervalID = null;
    this.interval = 1000;
    this.timer = props.timer;
    this.timerSeconds = props.timer / 1000;
    this.sessionsLeft = (props.settings['total-sessions'] * 2) / 10000;
    this.circleLength = 867.3883056640625;
    this.alarm = React.createRef();

    this.state = {
      toggleBtn: false,
      running: false,
      progress: 0 - this.circleLength,
      showDisplay: null,
      displayMsgs: {
        pomodoro: [
          `Do something amazing!`, `Go for it!`, `You can make it!`,
          `Let's get some work done!`, `Keep pushing!`
        ],
        break: [
          `Enjoy your ${this.props.settings.break / 60000}min break!`,
          `Now take a ${this.props.settings.break / 60000}min! break.`,
          `Just relax for ${this.props.settings.break / 60000}min!`,
          `Tired? Take a break and get ready.`
        ]
      }
    };
  }

  startPauseTimer = () => {
    this.timer = this.props.timer;
    this.setState((state) => ({ toggleBtn: !state.toggleBtn }));

    if (this.intervalID) {
      this.pauseTimer();
    } else {
      this.updateTimer();
    }
  };

  startTimer = () => {
    this.updateTimer();
  };

  pauseTimer = () => {
    this.intervalID.cancel();
    this.intervalID = null;
    this.setState({ running: false });
  };

  resetTimer = () => {
    this.intervalID && this.intervalID.cancel();
    this.intervalID = null;
    this.timeoutID && clearTimeout(this.timeoutID);
    this.timeoutID = null;
    this.alarm.current.currentTime = 0;
    this.alarm.current.pause();

    this.props.resetSettings();
    this.timer = 1500000;

    this.timerSeconds = this.timer / 1000 + 1;
    this.setState({
      running: false,
      toggleBtn: false,
      showDisplay: null,
      progress: 0 - this.circleLength
    });
    this.resetSessionsLeft();
    this.props.updateTimer(this.timer);
  };

  restartCounter = () => {
    const fccFix = 1000;

    this.sessionsLeft--;
    if (this.sessionsLeft > 0) {
      this.timeoutID = setTimeout(() => {
        this.intervalID && this.intervalID.cancel();
        this.intervalID = null;

        if (this.sessionsLeft % 2 !== 0) {
          this.timer = this.sessionsLeft === 1
            ? this.props.settings['long-break'] + fccFix
            : this.props.settings.break + fccFix;
        } else {
          this.timer = this.props.settings.session + fccFix;
        }
        this.setState({ progress: 0 - this.circleLength });
        this.timerSeconds = this.timer / 1000;
        this.startTimer();
      }, 500);
    } else {
      this.timeoutID = setTimeout(() => {
        this.resetSessionsLeft();
        this.resetTimer();
      }, 500);
    }
  };

  updateTimer = () => {
    this.intervalID && this.intervalID.cancel();
    this.updateDisplay();
    this.intervalID = this.setAccurateInterval(() => {
      const strokeStep = this.circleLength / this.timerSeconds;
      if (this.timer > 0) {
        this.setState((state) => ({
          progress: state.progress + strokeStep
        }));
        this.timer -= this.interval;
        this.props.updateTimer(this.timer);
      } else {
        this.alarm.current.play();
        this.props.updateTimer(0);
        this.intervalID && this.intervalID.cancel();
        this.restartCounter();
      }
    }, this.interval);
  };

  updateDisplay = () => {
    const pomodoroMsgs = this.state.displayMsgs.pomodoro;
    const breakMsgs = this.state.displayMsgs.break;
    this.setState((state) => ({
      running: !state.running,
      showDisplay: this.sessionsLeft % 2 !== 0
        ? this.sessionsLeft === 1
          ? `Time for a looooong break!`
          : breakMsgs[Math.floor(Math.random() * breakMsgs.length)]
        : pomodoroMsgs[Math.floor(Math.random() * pomodoroMsgs.length)]
    }));
  };

  resetSessionsLeft = () => {
    this.sessionsLeft = (this.props.settings['total-sessions'] * 2) / 10000;
  };

  setAccurateInterval = (fn, time) => {
    let cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = () => {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      fn();
    };
    cancel = () => clearTimeout(timeout);
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return { cancel };
  };

  render() {
    const printTimer = () => {
      let minutes = parseInt((this.props.timer / (1000 * 60)) % 60, 10);
      let seconds = parseInt((this.props.timer / 1000) % 60, 10);
      const hours = minutes === 60 ? '1:' : '';
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${hours}${minutes}:${seconds}`;
    };

    return (
      <main id="AppLayout">
        <React.Fragment>
          <section id="timer">
            <p className="heading">Tomato Time!</p>
            <div className="countdown" id="time-left">
              {printTimer()}
            </div>
            <p className="session" id="timer-label">{this.state.showDisplay || 'Ready?'}</p>
            <Tomatin
              pose="main"
              progress={this.state.progress}
              running={this.state.running}
              sessionsLeft={this.sessionsLeft}
            />
          </section>
          <section id="timer-buttons">
            <button
              id="start_stop"
              name="start-stop"
              tabIndex="1"
              onClick={this.startPauseTimer}
            >
              <i className={this.state.toggleBtn ? 'fas fa-pause-circle' : 'fas fa-play-circle'} />
            </button>
            <button
              id="reset"
              name="reset"
              tabIndex="2"
              onClick={this.resetTimer}
            >
              <i className="fas fa-stop-circle" />
            </button>
          </section>
          <audio id="beep" preload="auto" src={audioFile} ref={this.alarm} />
        </React.Fragment>
      </main>
    );
  }
}

export default Timer;
