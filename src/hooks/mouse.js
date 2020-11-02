import Vue from 'vue'
import { useBeforeDestroy } from './instance'

const useMouse = (callback = () => {}) => {
  const state = Vue.observable({
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
  document.addEventListener('mousemove', moveHandler)
  useBeforeDestroy(() => {
    document.removeEventListener('mousemove', moveHandler)
  })

  return state
}

const useFingerMouse = (callback = () => {}) => {
  const state = Vue.observable({
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
  document.addEventListener('touchmove', moveHandler, { passive: false })
  useBeforeDestroy(() => {
    document.removeEventListener('touchmove', moveHandler)
  })

  return state
}

export { useMouse, useFingerMouse }
