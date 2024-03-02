import { useState } from 'react'
import './App.css'
import { DisplayState, formatTime } from './helpers'
import alarmSound from './assets/alarmSound.mp3'
import Display from './Display'
import TimeSetter from './TimeSetter'

const defaultBreakTime = 5 * 60
const defaultSessionTime = 25 * 60
const min = 60 //60secs
const max = 60 * 60 //1 hour
const interval = 60 //1 min up or down

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime)
  const [sessionTime, setSessionTime] = useState(defaultSessionTime)
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: 'Session',
    timerRunning: false,
  })

  const reset = () => {
    console.log('reset')
  }

  const startStop = (displayState: DisplayState) => {
    console.log('startStop')
  }

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={setBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>

        <div className="session">
          <h4 id="session-label">session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={setSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={alarmSound}></audio>
    </div>
  )
}

export default App
