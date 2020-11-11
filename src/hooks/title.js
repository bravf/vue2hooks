import { useWatch, useBeforeDestroy } from './instance'
import useReactive from './reactive'

const useTitle = (title = document.title, restoreOnUnmount = false) => {
  const oldTitle = document.title
  const state = useReactive({
    value: title,
  })
  useWatch(
    () => state.value,
    () => {
      document.title = state.value
    },
    {
      immediate: true,
    },
  )
  if (restoreOnUnmount) {
    useBeforeDestroy(() => {
      document.title = oldTitle
    })
  }
  return state
}
export default useTitle
