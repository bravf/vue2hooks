import useInterval from './interval'
import useReactive from './reactive'
import { useWatch } from './instance'
import dayjs from 'dayjs'

const useCountdown = (targetDate, interval = 1000) => {
  const state = useReactive({
    targetDate: targetDate,
    countdown: 0,
    formatted: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    },
  })
  const format = () => {
    const formatted = state.formatted
    const countdown = state.countdown
    formatted.days = Math.floor(countdown / 86400000)
    formatted.hours = Math.floor(countdown / 3600000) % 24
    formatted.minutes = Math.floor(countdown / 60000) % 60
    formatted.seconds = Math.floor(countdown / 1000) % 60
    formatted.milliseconds = Math.floor(countdown) % 1000
  }
  const calcLeft = () => {
    if (!state.targetDate) return 0
    state.countdown = Math.max(dayjs(state.targetDate).valueOf() - new Date().getTime(), 0)
    format()
  }
  const timer = useInterval(
    () => {
      if (state.countdown === 0) {
        timer.stop()
      }
      calcLeft()
    },
    interval,
    false,
  )
  const start = () => {
    calcLeft()
    timer.restart()
  }
  useWatch(() => state.targetDate, start)
  start()
  return state
}

export default useCountdown
