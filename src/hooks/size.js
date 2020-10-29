import Vue from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { getTargetElement } from './_dom'
import { useMounted, useUpdated, useBeforeDestroy } from './instance'

const useSize = target => {
  const state = Vue.observable({
    clientWidth: NaN,
    clientHeight: NaN,
    offsetWidth: NaN,
    offsetHeight: NaN,
    scrollWidth: NaN,
    scrollHeight: NaN,
  })
  let el = null
  let resizeObserver = null
  const setSize = () => {
    if (!el) {
      return
    }
    state.clientWidth = el.clientWidth
    state.clientHeight = el.clientHeight
    state.offsetWidth = el.offsetWidth
    state.offsetHeight = el.offsetHeight
    state.scrollWidth = el.scrollWidth
    state.scrollHeight = el.scrollHeight
  }

  const setSizeEffect = () => {
    el = getTargetElement(target)
    setSize()
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(entries => {
        entries.forEach(setSize)
      })
    }
    resizeObserver.observe(el)
  }
  useMounted(setSizeEffect)
  useUpdated(setSizeEffect)
  useBeforeDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })
  return state
}

export default useSize
