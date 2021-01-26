import useReactive from './reactive'
import clonedeep from 'lodash.clonedeep'
import assign from 'lodash.assign'

const useQuickState = (params = {}) => {
  const state = useReactive(params)
  const backupState = clonedeep(state)
  const reset = () => {
    assign(state, cloneBackup())
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
