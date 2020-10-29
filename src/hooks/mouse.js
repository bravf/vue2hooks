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

export default useMouse
