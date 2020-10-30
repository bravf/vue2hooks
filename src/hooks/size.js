import Vue from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { getTargetElement } from './_dom'
import { useMounted, useUpdated, useBeforeDestroy } from './instance'

const useSize = (target, options = {}) => {
  const { onSizeChange } = options
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

    const { clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight } = el

    if (
      state.clientWidth !== clientWidth ||
      state.clientHeight !== clientHeight ||
      state.offsetWidth !== offsetWidth ||
      state.offsetHeight !== offsetHeight ||
      state.scrollWidth !== scrollWidth ||
      state.scrollHeight !== scrollHeight
    ) {
      state.clientWidth = clientWidth
      state.clientHeight = clientHeight
      state.offsetWidth = offsetWidth
      state.offsetHeight = offsetHeight
      state.scrollWidth = scrollWidth
      state.scrollHeight = scrollHeight
      onSizeChange && onSizeChange(state)
    }
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
