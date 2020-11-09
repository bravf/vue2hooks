import useReactive from './reactive'
import { useBeforeDestroy } from './instance'

const useMouse = (callback = () => {}) => {
  const state = useReactive({
    screenX: NaN,
    screenY: NaN,
    clientX: NaN,
    clientY: NaN,
    pageX: NaN,
    pageY: NaN,
  })
  const moveHandler = event => {
    state.screenX = event.screenX
    state.screenY = event.screenY
    state.clientX = event.clientX
    state.clientY = event.clientY
    state.pageX = event.pageX
    state.pageY = event.pageY
    callback(state)
  }
  const start = () => document.addEventListener('mousemove', moveHandler)
  const stop = () => document.removeEventListener('mousemove', moveHandler)
  useBeforeDestroy(stop)
  return { state, start, stop }
}

const useFingerMouse = (callback = () => {}) => {
  const state = useReactive({
    screenX: NaN,
    screenY: NaN,
    clientX: NaN,
    clientY: NaN,
    pageX: NaN,
    pageY: NaN,
  })
  const moveHandler = event => {
    event.preventDefault()
    const touch = event.touches[0]
    state.screenX = touch.screenX
    state.screenY = touch.screenY
    state.clientX = touch.clientX
    state.clientY = touch.clientY
    state.pageX = touch.pageX
    state.pageY = touch.pageY
    callback(state)
  }
  const start = () => document.addEventListener('touchmove', moveHandler, { passive: false })
  const stop = () => document.removeEventListener('touchmove', moveHandler)
  useBeforeDestroy(stop)
  return { state, start, stop }
}

export { useMouse, useFingerMouse }
