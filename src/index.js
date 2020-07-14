import Vue from "vue"
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

const useRequest = (fetcher, useRequestArgs = {}) => {
  useRequestArgs = {
    service: fetcher,
    fetchKey: () => {},
    updater: (state, data) => {
      state.data = data
    },
    debounceWait: 0,
    debounceOptions: {},
    throttleWait: 0,
    throttleOptions: {},
    manual: false,
    ...useRequestArgs
  }
  const createState = () => {
    return Vue.observable({
      loading: false,
      data: null,
      promise: null,
      error: null
    })
  }
  const states = {
    _default: createState()
  }
  const run = (...runArgs) => {
    const state = getState(...runArgs)
    if (state.loading) {
      return
    }
    state.loading = true
    const promise = state.promise = useRequestArgs
      .service(...runArgs)
      .then(data => {
        if (promise !== state.promise) {
          return
        }
        useRequestArgs.updater(state, data)
      })
      .catch(err => {
        if (promise !== state.promise) {
          return
        }
        state.error = err
      })
      .finally(() => {
        if (promise !== state.promise) {
          return
        }
        state.loading = false
      })
  }
  const cancel = (...cancelArgs) => {
    const state = getState(...cancelArgs)
    state.loading = false
    state.promise = null
  }
  const reset = (...resetArgs) => {
    const state = getState(...resetArgs)
    state.loading = false
    state.promise = null
    state.error = null
    state.data = null
  }
  const getState = (...getStateArgs) => {
    const key = useRequestArgs.fetchKey(...getStateArgs) || "_default"
    var state = states[key]
    if (!state) {
      state = createState()
      Vue.set(states, key, state)
    }
    return state
  }
  const runDebounce = debounce(run, useRequestArgs.debounceWait, useRequestArgs.debounceOptions)
  const runThrottle = throttle(run, useRequestArgs.throttleWait, useRequestArgs.throttleOptions)
  if (!useRequestArgs.manual) {
    run()
  }
  return {
    states,
    state: states["_default"],
    run,
    cancel,
    reset,
    getState,
    runDebounce,
    runThrottle,
  }
}

const useSwitch = initValue => {
  const state = {
    value: initValue || false
  }
  return {
    state,
    on: () => {
      state.value = true
    },
    off: () => {
      state.value = false
    },
    setValue: (value) => {
      state.value = value
    },
    isValue: (value) => {
      return state.value === value
    },
  }
}

export { 
  useRequest,
  useSwitch,
}
