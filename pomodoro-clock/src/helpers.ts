export interface DisplayState {
  time: number
  timeType: 'Session' | 'Break'
  timerRunning: boolean
}

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  // both minutes and seconds are displayed in two digits, with a leading zero if they are less than 10
  return `${minutes < 10 ? '0' + minutes.toString() : minutes} : ${
    +seconds < 10 ? '0' + seconds.toString() : seconds
  }`
}
