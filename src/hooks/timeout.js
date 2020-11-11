import { useBeforeDestroy } from './instance'

const useTimeout = (callback = () => {}, delay = 1000, immediate = true) => {
  let timer

  const stop = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }
  const start = () => {
    stop()
    timer = setTimeout(callback, delay)
  }

  if (immediate) {
    start()
  }
  useBeforeDestroy(stop)

  return { start, stop }
}

export default useTimeout
