import Vue from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { getTargetElement } from './_dom'
import { useMounted, useUpdated, useBeforeDestroy, context } from './instance'

const useSize = refName => {
  const size = Vue.observable({
    width: NaN,
    height: NaN,
  })
  const vm = context._this
  let el = null
  let resizeObserver = null
  const setSize = () => {
    if (!el) {
      return
    }
    size.width = el.clientWidth
    size.height = el.clientHeight
  }

  const setSizeEffect = () => {
    el = getTargetElement(vm.$refs[refName])
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
  return size
}

export default useSize
