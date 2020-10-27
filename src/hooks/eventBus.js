import Vue from 'vue'
import { useBeforeDestroy } from './instance'

const eventBus = new Vue()
const useEventOn = (event, callback) => {
  eventBus.$on(event, callback)
  useBeforeDestroy(() => {
    useEventOff(event, callback)
  })
}
const useEventOnce = (...args) => eventBus.$once(...args)
const useEventOff = (...args) => eventBus.$off(...args)
const useEventEmit = (...args) => eventBus.$emit(...args)

export { useEventOn, useEventOnce, useEventOff, useEventEmit }
