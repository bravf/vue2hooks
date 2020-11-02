import { useMouse, useFingerMouse } from './mouse'
import { useBeforeDestroy } from './instance'

const _useMove = (eventType, _useMouse, getTouch) => {
  return options => {
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
      currPos.x = startPos.x + mouse.pageX - startMousePos.x
      currPos.y = startPos.y + mouse.pageY - startMousePos.y
      onMove && onMove(currPos)
    })
    const onMousedown = (event, pos) => {
      if (!pos) {
        return
      }
      const touch = getTouch(event)
      startMousePos.x = touch.pageX
      startMousePos.y = touch.pageY

      currPos = pos
      isStart = true
      startPos.x = currPos.x
      startPos.y = currPos.y
    }
    const onMouseup = () => {
      if (!isStart) return
      isStart = false
      onMoveEnd && onMoveEnd(currPos)
    }
    document.addEventListener(eventType, onMouseup)
    useBeforeDestroy(() => {
      document.removeEventListener(eventType, onMouseup)
    })
    return onMousedown
  }
}

const useMove = _useMove('mouseup', useMouse, event => event)
const useFingerMove = _useMove('touchend', useFingerMouse, event => event.touches[0])

export { useMove, useFingerMove }
