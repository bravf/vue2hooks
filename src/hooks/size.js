import useReactive from './reactive'
import ResizeObserver from 'resize-observer-polyfill'
import { getTargetElement } from './_dom'
import { useBeforeDestroy, useEffect } from './instance'

const useSize = (options = {}) => {
  const { onSizeChange } = options

  const setSize = (target, state) => {
    const el = getTargetElement(target)
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

  const targetStates = []
  const createState = () =>
    useReactive({
      clientWidth: NaN,
      clientHeight: NaN,
      offsetWidth: NaN,
      offsetHeight: NaN,
      scrollWidth: NaN,
      scrollHeight: NaN,
    })

  const createObserver = effect => new ResizeObserver(entries => entries.forEach(effect))

  const addTarget = target => {
    const state = createState()
    const effect = () => {
      setSize(target, state)
    }
    const observer = createObserver(effect)
    targetStates.push({
      target,
      observer,
      effect,
    })
    return state
  }
  const runEffects = () =>
    targetStates.forEach(targetState => {
      const el = getTargetElement(targetState.target)
      targetState.effect()
      targetState.observer.observe(el)
    })
  useEffect(runEffects)
  useBeforeDestroy(() => {
    targetStates.forEach(targetState => targetState.observer.disconnect())
  })

  return addTarget
}

export default useSize
