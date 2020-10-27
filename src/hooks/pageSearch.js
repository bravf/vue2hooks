import { context } from './instance'
import useQuickState from './quickState'
import useRouteQueryChange from './routeQueryChange'
import isBoolean from 'lodash.isboolean'
import isNumber from 'lodash.isnumber'

const usePageSearch = (usePageSearchArgs = {}) => {
  usePageSearchArgs = {
    quickState: useQuickState(),
    format: {},
    onSearch: () => {},
    ...usePageSearchArgs,
  }
  const vm = context._this
  const { quickState, format, onSearch } = usePageSearchArgs
  const paramsState = quickState.state
  const routePath = vm.$route.path
  const convert = (key, value) => {
    if (key in format) {
      return format[key].parse(value)
    }
    const originValue = paramsState[key]
    if (isNumber(originValue)) {
      return Number(value)
    }
    if (isBoolean(originValue)) {
      if (value === 'true') {
        return true
      } else {
        return false
      }
    }
    return value
  }
  const parse = () => {
    const newParams = quickState.cloneBackup()
    const routerQuery = vm.$route.query
    for (const key in routerQuery) {
      if (key in newParams) {
        newParams[key] = convert(key, routerQuery[key])
      }
    }
    return newParams
  }
  const stringify = () => {
    const effective = {}
    for (const key in paramsState) {
      const stringifyFn = format[key]?.stringify || (val => val)
      const value = stringifyFn(paramsState[key])
      if (value !== stringifyFn(quickState.backupState[key])) {
        effective[key] = value
      }
    }
    return effective
  }
  const run = () => {
    quickState.assign(parse())
    onSearch(quickState.state)
  }
  const search = () => {
    vm.$router.push({ path: routePath, query: stringify() }).catch(() => {
      run()
    })
  }
  const reset = () => {
    quickState.reset()
    search()
  }

  useRouteQueryChange({
    callback: run,
  })

  return {
    search,
    reset,
  }
}

export default usePageSearch
