import { useMouse, useFingerMouse } from './mouse'
import useQuickState from './quickState'

const _useMove = (eventType, _useMouse, getTouch) => (options = {}) => {
  const { onMove, onMoveEnd } = options
  let currPos = null
  let isStart = false
  const startPos = {
    x: 0,
    y: 0,
  }
  const startMousePos = {
    x: 0,
    y: 0,
  }
  const moveDistance = useQuickState({
    x: 0,
    y: 0,
  })
  const mouse = _useMouse(() => {
    if (!isStart) return
    const x = mouse.state.pageX - startMousePos.x
    const y = mouse.state.pageY - startMousePos.y
    currPos.x = startPos.x + x
    currPos.y = startPos.y + y
    moveDistance.state.x = x
    moveDistance.state.y = y
    onMove && onMove(currPos, moveDistance.state)
  })
  const onMousedown = (event, pos) => {
    if (!pos) {
      return
    }
    isStart = true
    moveDistance.reset()
    mouse.start()
    const touch = getTouch(event)
    startMousePos.x = touch.pageX
    startMousePos.y = touch.pageY
    currPos = pos
    startPos.x = currPos.x
    startPos.y = currPos.y
    listenMouseup()
  }
  const onMouseup = () => {
    if (!isStart) return
    isStart = false
    mouse.stop()
    removeMouseup()
    onMoveEnd && onMoveEnd(currPos, moveDistance.state)
  }
  const listenMouseup = () => document.addEventListener(eventType, onMouseup)
  const removeMouseup = () => document.removeEventListener(eventType, onMouseup)
  return onMousedown
}

const useMove = _useMove('mouseup', useMouse, event => event)
const useFingerMove = _useMove('touchend', useFingerMouse, event => event.touches[0])

export { useMove, useFingerMove }
