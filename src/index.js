import Vue from 'vue'
import {
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
} from './hooks/instance'
import { useEventOn, useEventOnce, useEventOff, useEventEmit } from './hooks/eventBus'
import usePageSearch from './hooks/pageSearch'
import useQuickState from './hooks/quickState'
import useRequest from './hooks/request'
import useRouteQueryChange from './hooks/routeQueryChange'
import useSwitch from './hooks/switch'
import useMouse from './hooks/mouse'
import useMove from './hooks/move'
import useSize from './hooks/size'

Vue.mixin({
  beforeCreate() {
    context._this = this
  },
})

export {
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
  useEventOn,
  useEventOnce,
  useEventOff,
  useEventEmit,
  usePageSearch,
  useQuickState,
  useRequest,
  useRouteQueryChange,
  useSwitch,
  useMouse,
  useMove,
  useSize,
}
