import useMouse from './mouse'
import { useBeforeDestroy } from './instance'

const useMove = (options = {}) => {
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
  const mouse = useMouse(() => {
    if (!isStart) return
    currPos.x = startPos.x + mouse.pageX - startMousePos.x
    currPos.y = startPos.y + mouse.pageY - startMousePos.y
    onMove && onMove(currPos)
  })
  const onMousedown = pos => {
    if (!pos) {
      return
    }
    currPos = pos
    isStart = true
    startMousePos.x = mouse.pageX
    startMousePos.y = mouse.pageY
    startPos.x = currPos.x
    startPos.y = currPos.y
  }
  const onMouseup = () => {
    if (!isStart) return
    isStart = false
    onMoveEnd && onMoveEnd(currPos)
  }
  document.addEventListener('mouseup', onMouseup)
  useBeforeDestroy(() => {
    document.removeEventListener('mouseup', onMouseup)
  })
  return onMousedown
}

export default useMove
