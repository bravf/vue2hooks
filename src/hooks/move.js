import useMouse from './mouse'
import { useBeforeDestroy } from './instance'

const useMove = (initPos = { x: 0, y: 0 }, limit = () => {}) => {
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
    initPos.x = startPos.x + mouse.pageX - startMousePos.x
    initPos.y = startPos.y + mouse.pageY - startMousePos.y
    limit(initPos)
  })
  const onMousedown = () => {
    isStart = true
    startMousePos.x = mouse.pageX
    startMousePos.y = mouse.pageY
    startPos.x = initPos.x
    startPos.y = initPos.y
  }
  const onMouseup = () => {
    if (!isStart) return
    isStart = false
  }
  document.addEventListener('mouseup', onMouseup)
  useBeforeDestroy(() => {
    document.removeEventListener('mouseup', onMouseup)
  })
  return {
    start: onMousedown,
  }
}

export default useMove
