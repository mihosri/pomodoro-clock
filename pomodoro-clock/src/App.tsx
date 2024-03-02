import { useState } from 'react'
import './App.css'

function App() {
  const [breakTime, setBreakTime] = useState(5)
  const [session, setSession] = useState(25)

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div className="break-container">
        <div id="break-label">"Break Length"</div>
        <button id="break-decrement"></button>
        <div id="break-length">{breakTime}</div>
        <button id="break-increment"></button>
      </div>

      <div className="session-container">
        <div id="session-label">"session Length"</div>
        <button id="session-decrement"></button>
        <div id="session-length">{session}</div>
        <button id="session-increment"></button>
      </div>
    </div>
  )
}

export default App
