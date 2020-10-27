import Vue from 'vue'
import clonedeep from 'lodash.clonedeep'
import assign from 'lodash.assign'

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

export default useQuickState
