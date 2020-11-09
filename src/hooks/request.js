import Vue from 'vue'
import useReactive from './reactive'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import { useBeforeDestroy } from './instance'

const useRequestStates = useReactive({})
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
    ...useRequestArgs,
  }
  const getArgs = args => args || useRequestArgs.defaultParams()
  const createState = () => {
    return useReactive({
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

  useBeforeDestroy(() => {
    Object.keys(states).forEach(k => {
      cancelStatePolling(states[k])
    })
  })
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

export default useRequest
