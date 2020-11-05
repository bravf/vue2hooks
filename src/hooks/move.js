import { useMouse, useFingerMouse } from './mouse'
import { useBeforeDestroy } from './instance'

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
  const mouse = _useMouse(() => {
    if (!isStart) return
    currPos.x = startPos.x + mouse.state.pageX - startMousePos.x
    currPos.y = startPos.y + mouse.state.pageY - startMousePos.y
    onMove && onMove(currPos)
  })
  const onMousedown = (event, pos) => {
    if (!pos) {
      return
    }
    event.preventDefault()
    isStart = true
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
    onMoveEnd && onMoveEnd(currPos)
  }
  const listenMouseup = () => document.addEventListener(eventType, onMouseup)
  const removeMouseup = () => document.removeEventListener(eventType, onMouseup)
  useBeforeDestroy(removeMouseup)
  return onMousedown
}

const useMove = _useMove('mouseup', useMouse, event => event)
const useFingerMove = _useMove('touchend', useFingerMouse, event => event.touches[0])

export { useMove, useFingerMove }
