import { useWatch, useCreated } from './instance'

const useRouteQueryChange = (useRouteChangeArgs = {}) => {
  useRouteChangeArgs = {
    immediate: true,
    callback: () => {},
    ...useRouteChangeArgs,
  }
  const { callback, immediate } = useRouteChangeArgs
  useWatch('$route', (to, from) => {
    if (to.path === from.path) {
      callback()
    }
  })
  useCreated(() => {
    if (immediate) {
      callback()
    }
  })
}

export default useRouteQueryChange
