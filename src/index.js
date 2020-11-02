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
  useContext,
} from './hooks/instance'
import { useEventOn, useEventOnce, useEventOff, useEventEmit } from './hooks/eventBus'
import usePageSearch from './hooks/pageSearch'
import useQuickState from './hooks/quickState'
import useRequest from './hooks/request'
import useRouteQueryChange from './hooks/routeQueryChange'
import useSwitch from './hooks/switch'
import { useMouse, useFingerMouse } from './hooks/mouse'
import { useMove, useFingerMove } from './hooks/move'
import useSize from './hooks/size'
import useFullscreen from './hooks/fullscreen'

Vue.mixin({
  beforeCreate() {
    context._this = this
  },
  mounted() {
    context._this = null
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
  useContext,
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
  useFingerMouse,
  useMove,
  useFingerMove,
  useSize,
  useFullscreen,
}
