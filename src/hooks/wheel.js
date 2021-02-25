import { useBeforeDestroy } from './instance'
import throttle from 'lodash.throttle'

const isFirefox = () => !!window.navigator.userAgent.match(/firefox/i)
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'
const useWheel = (callback = () => {}) => {
  const onWheel = throttle(e => {
    const delta = e.wheelDelta ? e.wheelDelta : -e.detail
    callback(delta)
  })
  const start = () => {
    document.addEventListener(mousewheelEventName, onWheel, false)
  }
  const stop = () => {
    document.removeEventListener(mousewheelEventName, onWheel)
  }
  useBeforeDestroy(stop)
  return {
    start,
    stop,
  }
}
export default useWheel
