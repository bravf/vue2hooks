import Vue from 'vue'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import clonedeep from 'lodash.clonedeep'
import assign from 'lodash.assign'

const getType = obj =>
  Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase()

const useRequestStates = Vue.observable({})
const useRequest = (fetcher, useRequestArgs = {}) => {
  useRequestArgs = {
    service: fetcher,
    fetchKey: () => {},
    dataType: () => {},
    defaultParams: () => {},
    updater: (state, data) => {
      state.data = data
    },
    onSuccess: () => {},
    onError: () => {},
    debounceWait: 0,
    debounceOptions: {},
    throttleWait: 0,
    throttleOptions: {},
    pollingInterval: 1000,
    auto: false,
    vm: null,
    ...useRequestArgs,
  }
  const getArgs = args => args || useRequestArgs.defaultParams()
  const createState = () => {
    return Vue.observable({
      loading: false,
      data: useRequestArgs.dataType(),
      promise: null,
      error: null,
      timer: null,
    })
  }
  const states = {
    _default: createState(),
  }
  const run = runArgs => {
    runArgs = getArgs(runArgs)
    const state = getState(runArgs)
    if (state.loading) {
      return
    }
    state.loading = true
    const promise = (state.promise = useRequestArgs
      .service(runArgs)
      .then(data => {
        if (promise !== state.promise) {
          return
        }
        useRequestArgs.updater(state, data)
        useRequestArgs.onSuccess(state.data, runArgs)
        return data
      })
      .catch(err => {
        if (promise !== state.promise) {
          return
        }
        state.error = err
        useRequestArgs.onError(state.error, runArgs)
        throw err
      })
      .finally(() => {
        if (promise !== state.promise) {
          return
        }
        state.loading = false
      }))
    return promise
  }
  const cancelStatePolling = state => {
    clearTimeout(state.timer)
    state.timer = null
  }
  const cancel = cancelArgs => {
    const state = getState(cancelArgs)
    state.loading = false
    state.promise = null
    cancelStatePolling(state)
  }
  const reset = resetArgs => {
    const state = getState(resetArgs)
    cancel(resetArgs)
    state.error = null
    state.data = useRequestArgs.dataType()
  }
  const getState = getStateArgs => {
    getStateArgs = getArgs(getStateArgs)
    const key = useRequestArgs.fetchKey(getStateArgs) || '_default'
    let state = states[key] || useRequestStates[key]
    if (!state) {
      state = createState()
      Vue.set(states, key, state)
      Vue.set(useRequestStates, key, state)
    }
    return state
  }
  const runDebounce = debounce(run, useRequestArgs.debounceWait, useRequestArgs.debounceOptions)
  const runThrottle = throttle(run, useRequestArgs.throttleWait, useRequestArgs.throttleOptions)
  const runPolling = runPollingArgs => {
    const state = getState(runPollingArgs)
    if (state.timer) {
      return
    }
    let timer = (state.timer = setTimeout(() => {}))
    const _run = () => {
      const promise = run(runPollingArgs)
      if (!promise) {
        return
      }
      promise.finally(() => {
        if (state.timer !== timer) {
          return
        }
        timer = state.timer = setTimeout(_run, useRequestArgs.pollingInterval)
      })
    }
    _run()
  }
  const { vm } = useRequestArgs
  if (vm) {
    vm.$on('hook:beforeDestroy', () => {
      Object.keys(states).forEach(k => {
        cancelStatePolling(states[k])
      })
    })
  }
  if (useRequestArgs.auto) {
    run()
  }
  return {
    states,
    state: states['_default'],
    run,
    cancel,
    reset,
    getState,
    runDebounce,
    runThrottle,
    runPolling,
  }
}

const useQuickState = (params = {}) => {
  const state = Vue.observable(params)
  const backupState = clonedeep(state)
  const reset = () => {
    assign(state, backupState)
  }
  const clone = () => clonedeep(state)
  const cloneBackup = () => clonedeep(backupState)
  return {
    state,
    backupState,
    clone,
    reset,
    assign: newParams => assign(state, newParams),
    cloneBackup,
  }
}

const useRouteQueryChange = (useRouteChangeArgs = {}) => {
  useRouteChangeArgs = {
    vm: null,
    immediate: true,
    callback: () => {},
    ...useRouteChangeArgs,
  }
  const { vm, callback, immediate } = useRouteChangeArgs
  vm.$watch('$route', (to, from) => {
    if (to.path === from.path) {
      callback()
    }
  })
  vm.$on('hook:created', () => {
    if (immediate) {
      callback()
    }
  })
}

const usePageSearch = (usePageSearchArgs = {}) => {
  usePageSearchArgs = {
    quickState: useQuickState(),
    format: {},
    onSearch: () => {},
    vm: null,
    ...usePageSearchArgs,
  }
  const { quickState, format, vm, onSearch } = usePageSearchArgs
  const paramsState = quickState.state
  const routePath = vm.$route.path
  const convert = (key, value, type) => {
    if (key in format) {
      return format[key].parse(value)
    }
    if (type === 'number') {
      return Number(value)
    }
    if (type === 'boolean') {
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
        newParams[key] = convert(key, routerQuery[key], getType(paramsState[key]))
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
    vm,
    callback: run,
  })

  return {
    search,
    reset,
  }
}

const useSwitch = (initValue = false) => {
  const state = Vue.observable({
    value: initValue,
  })
  return {
    state,
    on: () => {
      state.value = true
    },
    off: () => {
      state.value = false
    },
    toggle: () => {
      state.value = !state.value
    },
    setValue: value => {
      state.value = value
    },
    isValue: value => {
      return state.value === value
    },
  }
}

const eventBus = new Vue()
const useEventOn = (event, callback, vm) => {
  eventBus.$on(event, callback)
  vm.$on('hook:beforeDestroy', () => {
    useEventOff(event, callback)
  })
}
const useEventOnce = (...args) => eventBus.$once(...args)
const useEventOff = (...args) => eventBus.$off(...args)
const useEventEmit = (...args) => eventBus.$emit(...args)

export {
  useRequest,
  useQuickState,
  useSwitch,
  usePageSearch,
  useRouteQueryChange,
  useEventOn,
  useEventOnce,
  useEventOff,
  useEventEmit,
}
