import Vue from 'vue'
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
const useEffect = callback => {
  useMounted(callback)
  useUpdated(callback)
}
const useWatch = (...args) => {
  // watch 需要在 created 之后调用
  useCreated(() => context._this.$watch(...args))
}
const useComputed = (key, value) => {
  if (!context._this.$options.computed) {
    context._this.$options.computed = {}
  }
  context._this.$options.computed[key] = value
}
const useContext = _this => (context._this = _this)

Vue.mixin({
  beforeCreate() {
    context._this = this
  },
  mounted() {
    context._this = null
  },
})

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
  useComputed,
  useContext,
  useEffect,
}
