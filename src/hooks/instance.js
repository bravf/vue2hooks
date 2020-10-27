const context = {
  _this: null,
}
const useCreated = callback => context._this.$on('hook:created', callback)
const useBeforeMount = callback => context._this.$on('hook:beforeMount', callback)
const useMounted = callback => context._this.$on('hook:mounted', callback)
const useBeforeUpdate = callback => context._this.$on('hook:beforeUpdate', callback)
const useUpdated = callback => context._this.$on('hook:updated', callback)
const useActivated = callback => context._this.$on('hook:activated', callback)
const useDeactivated = callback => context._this.$on('hook:deactivated', callback)
const useBeforeDestroy = callback => context._this.$on('hook:beforeDestroy', callback)
const useDestroyed = callback => context._this.$on('hook:destroyed', callback)
const useWatch = (...args) => context._this.$watch(...args)

export {
  context,
  useCreated,
  useBeforeMount,
  useMounted,
  useBeforeUpdate,
  useUpdated,
  useActivated,
  useDeactivated,
  useBeforeDestroy,
  useDestroyed,
  useWatch,
}