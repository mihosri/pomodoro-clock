import { useState, useEffect } from 'react'
import './App.css'
import { DisplayState } from './helpers'
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

  //useEffect hook - when the timer starts, for every 1 sec call the decdisplay func to update
  useEffect(() => {
    let timerID: number
    if (!displayState.timerRunning) return

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000)
    }

    return () => {
      window.clearInterval(timerID)
    }
  }, [displayState.timerRunning])

  //this one is to handle the audio
  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById('beep') as HTMLAudioElement
      audio.currentTime = 1
      audio.play().catch((err) => console.log(err))
      setDisplayState((prev) => ({
        ...prev,
        time: prev.timeType === 'Session' ? breakTime : sessionTime,
        timeType: prev.timeType === 'Session' ? 'Break' : 'Session',
      }))
    }
  }, [displayState, breakTime, sessionTime])

  const reset = () => {
    setBreakTime(defaultBreakTime)
    setSessionTime(defaultSessionTime)
    setDisplayState({
      time: sessionTime,
      timeType: 'Session',
      timerRunning: false,
    })
    const audio = document.getElementById('beep') as HTMLAudioElement
    audio.pause()
    audio.currentTime = 0
  }

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }))
  }

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return
    setBreakTime(time)
    setDisplayState({
      time: time,
      timeType: 'Break',
      timerRunning: false,
    })
  }

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return
    setSessionTime(time)
    setDisplayState({
      time: time,
      timeType: 'Session',
      timerRunning: false,
    })
  }

  //when the timer runs, the time decrements
  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }))
  }

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
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
            setTime={changeSessionTime}
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
