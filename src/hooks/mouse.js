import Vue from 'vue'
import { useCreated, useBeforeDestroy } from './instance'

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
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event
    state.screenX = screenX
    state.screenY = screenY
    state.clientX = clientX
    state.clientY = clientY
    state.pageX = pageX
    state.pageY = pageY
    callback(state)
  }
  useCreated(() => {
    document.addEventListener('mousemove', moveHandler)
  })
  useBeforeDestroy(() => {
    document.removeEventListener('mousemove', moveHandler)
  })

  return state
}

export default useMouse
