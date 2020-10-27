import Vue from 'vue'

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

export default useSwitch
