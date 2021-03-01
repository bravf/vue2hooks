# vue2hooks

## 介绍

vue2hooks 是针对 vue2.x 的一款类 composition api 的工具库，老项目无需做任何升级，也无需了解 3.0 中关于 composition api 的任何提案和概念即可使用。

## 安装:

```
npm install --save vue2hooks
```

## 使用:

```javascript
import { useRequest } from 'vue2hooks'
```

## Api Table of Contents

- [useRequest](#useRequest)
- [useQuickState](#useQuickState)
- [usePageSearch](#usePageSearch)
- [useRouteQueryChange](#useRouteQueryChange)
- [useSwitch](#useSwitch)
- [useMouse](#useMouse)
- [useFingerMouse](#useFingerMouse)
- [useMove](#useMove)
- [useFingerMove](#useFingerMove)
- [useSize](#useSize)
- [useFullscreen](#useFullscreen)
- [useCreated](#useCreated)
- [useBeforeMount](#useBeforeMount)
- [useMounted](#useMounted)
- [useBeforeUpdate](#useBeforeUpdate)
- [useUpdated](#useUpdated)
- [useActivated](#useActivated)
- [useDeactivated](#useDeactivated)
- [useBeforeDestroy](#useBeforeDestroy)
- [useDestroyed](#useDestroyed)
- [useWatch](#useWatch)
- [useComputed](#useComputed)
- [useContext](#useContext)
- [useEffect](#useEffect)
- [useReactive](#useReactive)
- [useEventOn](#useEventOn)
- [useEventOnce](#useEventOnce)
- [useEventOff](#useEventOff)
- [useEventEmit](#useEventEmit)
- [useInterval](#useInterval)
- [useTimeout](#useTimeout)
- [useTitle](#useTitle)
- [useCountdown](#useCountdown)
- [useWheel](#useWheel)

### useRequest

#### Demo:

```javascript
<template>
<div class="list-page">
  <div v-if="getListReq.state.loading">loading...</div>
  <div v-if="getListReq.state.error">{{ getListReq.state.error }}</div>
  <div v-if="getListReq.state.data">
    <div v-for="item in getListReq.state.data"></div>
  </div>
</template>
<script>
const testPromise = (testData, timeout) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(testData)
    }, timeout || 500)
  })
export default {
  data () {
    const getList = () => testPromise([])
    const getListReq = useRequest(getList, {
      auto: true,
    })
    return {
      getListReq,
    }
  }

</script>
```

#### Config:

```html
<script>
  const {
    // 请求的结果集合
    states,
    // 没有设置 fetckKey 时候，默认的结果
    state: states['_default'],
    // 主动发起请求
    run,
    // 中断请求
    cancel,
    // 中断请求，并重置 state
    reset,
    // 根据 fetchKey 获取对应的 state
    getState,
    // 对 run 进行 debounce
    runDebounce,
    // 对 run 进行 throttle
    runThrottle,
    // 轮询 run
    runPolling,
  } = useRequest(
    // 返回 promise 对象的函数
    fetcher: () => Promise,
    {
      // 请求设定的 key，用来设置并发
      fetchKey: () => {},
      // 默认的 state.data 为 undefined，可以通过此设置默认的数据类型
      dataType: () => {},
      // 设置默认的请求参数，参数会被传给 fetcher
      defaultParams: () => {},
      // 如何处理 fetcher 返回的数据，默认是直接赋值给 state.data
      updater: (state, data) => {
        state.data = data
      },
      // 当 fetcher 成功后的回调
      onSuccess: () => {},
      // 当 fetcher 失败后的回调
      onError: () => {},
      // 设置 debounce 相关参数，同 lodash.throttle
      debounceWait: 0,
      debounceOptions: {},
      // 设置 throttle 相关参数，同 lodash.throttle
      throttleWait: 0,
      throttleOptions: {},
      // 设置轮询请求的间隔时间
      pollingInterval: 1000,
      // 是否自动触发 fetcher 请求
      auto: false,
    }
  )
</script>
```

### useQuickState

#### Demo:

```html
<template>
  <form>
    <form-item label="name">
      <input v-model="writeQState.state.name" />
    </form-item>
    <form-item label="gender">
      <input v-model="writeQState.state.gender" />
    </form-item>
    <button @click="writeState.reset">Reset</button>
  </form>
</template>
<script>
  export default {
    data() {
      const writeQState = useQuickState({
        name: '',
        gender: '',
      })
      return {
        writeQState,
      }
    },
  }
</script>
```

#### Config:

```javascript
const {
  // 传入的 params，比如：state.name, state.gender
  state,
  // 原始数据的备份，深拷贝
  backupState,
  // 拷贝一份当前的 state，深拷贝
  clone,
  // 重置 state 为原始数据，行为同 lodash.clonedeep
  reset,
  // 对 state 进行 assign，assign 行为同 lodash.assign
  assign: newParams => assign(state, newParams),
  // 拷贝一份原始数据，深拷贝
  cloneBackup,
} = useQuickState(params = {})
```

### useSwitch

#### Demo:

```html
<template>
  <dialog v-model="detailSwitch.state.value"></dialog>
</template>
<script>
  export default {
    data() {
      const detailSwitch = useSwitch()
      return {
        detailSwitch,
      }
    },
  }
</script>
```

#### Config:

```javascript
const {
  // state.value
  state,
  // 设置 value 为 true
  on,
  // 设置 value 为 false
  off,
  // 切换 on 和 off
  toggle,
  // 设置 value，用来做多状态切换
  setValue,
  // 判断 value，用来做多状态切换
  isValue,
} = useSwitch((initValue = false))
```

### useRouteQueryChange

#### Demo:

```html
<script>
  // 监听 route 参数变化
  export default {
    data() {
      useRouteQueryChange({ callback: () => {} })
    },
  }
</script>
```

#### Config:

```javascript
useRouteQueryChange({
  // 是否在组件初始化时候立即执行一次，时机为 created
  immediate: true,
  // 要执行的函数
  callback: () => {},
})
```

### usePageSearch

#### Demo:

```html
// 在搜索列表页，我们经常需要把搜索参数挂到 url 上，并能从 url 上同步参数到搜索参数
<template>
  <form>
    <form-item label="name">
      <input v-model="searchQState.state.name" />
    </form-item>
    <form-item label="gender">
      <input v-model="searchQState.state.gender" />
    </form-item>
    <button @click="pageSearch.reset">Reset</button>
    <button @click="pageSearch.search">Search</button>
  </form>
</template>
<script>
  export default {
    data() {
      const searchQState = useQuickState({
        name: '',
        gender: '',
      })
      const pageSearch = usePageSearch({
        quickState: searchQState,
        onSearch: () => {
          // listReq.run()
        },
      })
      return {
        searchQState,
        pageSearch,
      }
    },
  }
</script>
```

#### Config:

```javascript
const {
  // 此方法会把请求参数挂到 url 上，并触发传入的 onSearch 方法
  search,
  // 此方法会把 url 上的参数清空，并触发传入的 onSearch 方法
  reset,
} = usePageSearch({
  // 这是一个 quickState 类型对象，请用上面的 useQuickState 生成
  quickState: useQuickState(),
  // 定义在把参数挂到 url 上的时候如何序列化和反序列化
  format: {
    // 参数名
    gender: {
      // 序列化
      stringify: value => value,
      // 反序列化
      parse: value => parseInt(value),
    },
  },
  // 当执行 search 方法时候或者 router 参数变化时候触发的回调
  onSearch: () => {},
})
```

### useEventOn

### useEventOnce

### useEventOff

### useEventEmit

#### Demo:

```javascript
// 上面 4 个方法是封装了一个全局 eventBus 后衍生的方法，基本同 eventBus
useEventOn('dataChange', () => {})
useEventEmit('dataChange', [])
useEventOff('dataChange')
```

### useCreated

### useBeforeMount

### useMounted

### useBeforeUpdate

### useUpdated

### useActivated

### useDeactivated

### useBeforeDestroy

### useDestroyed

### useWatch

### useContext

### useEffect

### useReactive

#### Config:

```javascript
// 组件实例方法的封装
useCreated(() => {
  console.log('created')
})
```

### useMouse

#### Demo:

```javascript
// state: { screenX, screenY, clientX, clientY, pageX, pageY }
const { state, start, stop } = useMouse(() => {
  console.log('mouse move')
})
start()
stop()
```

### useFingerMouse

#### Demo（移动端使用）:

```javascript
const { state, start, stop } = useFingerMouse(() => {
  console.log('mouse move')
})
start()
stop()
```

### useMove

#### Config:

```javascript
const move = useMove([options])
```

#### Demo:

```html
<style lang="sass" scoped>
  .move-div
    position: absolute
    width: 200px
    height: 200px
    border: 1px solid red
</style>
<template lang="pug">
.move
  h2 move test
  .move-div(@mousedown='(e) => move(e, divPos)', :style='{ left: divPos.x + "px", top: divPos.y + "px" }') move me
</template>
<script>
  import { useMove } from '../index.js'
  export default {
    name: 'Mouse',
    data() {
      const divPos = { x: 100, y: 100 }
      const move = useMove({
        onMove: (pos, moveDistance) => {
          pos.x = Math.max(0, pos.x)
          pos.y = Math.max(0, pos.y)
          console.log('on move', pos)
        },
        onMoveEnd: pos => console.log('on move end', pos),
      })
      return {
        divPos,
        move,
      }
    },
  }
</script>
```

### useFingerMove

#### Config:

```javascript
const move = useFingerMove([options])
```

#### Demo（移动端使用）:

```html
<style lang="sass" scoped>
  .move-div
    position: absolute
    width: 200px
    height: 200px
    border: 1px solid red
</style>
<template lang="pug">
.move
  h2 move test
  .move-div(@touchstart='(e) => move(e, divPos)', :style='{ left: divPos.x + "px", top: divPos.y + "px" }') move me
</template>
<script>
  import { useFingerMove } from '../index.js'
  export default {
    name: 'Mouse',
    data() {
      const divPos = { x: 100, y: 100 }
      const move = useFingerMove({
        onMove: (pos, moveDistance) => {
          pos.x = Math.max(0, pos.x)
          pos.y = Math.max(0, pos.y)
          console.log('on move', pos)
        },
        onMoveEnd: pos => console.log('on move end', pos),
      })
      return {
        divPos,
        move,
      }
    },
  }
</script>
```

### useSize

#### Config

```javascript
const getSize = useSize([options])
const size = getSize(() => this.$refs.div)
```

#### Demo

```html
<style lang="sass" scoped>
  .size-div
    border: 1px solid red
</style>
<template lang="pug">
.size
  h2 size test
  div 元素大小 {{ size }}
  .size-div(ref='div')
    img(src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')
</template>
<script>
  import { useSize } from '../index.js'
  export default {
    name: 'Size',
    data() {
      const getSize = useSize({
        onSizeChange: state => {
          console.log(state)
        },
      })
      return {
        size: getSize(() => this.$refs.div),
      }
    },
  }
</script>
```

### useFullscreen

#### Config

```javascript
const { state, setFull, exitFull, toggleFull } = useFullscreen(target, [options])
```

#### Demo

```html
<style lang="sass" scoped>
  .fullscreen
    background: #fff
</style>
<template lang="pug">
.fullscreen(ref="div")
  h2 fullscreen test
  div {{fullscreen.state.value}}
  el-button-group
    el-button(@click="fullscreen.setFull()") setFull
    el-button(@click="fullscreen.exitFull()") exitFull
    el-button(@click="fullscreen.toggleFull()") toggleFull
</template>
<script>
  import { useFullscreen } from '../index.js'
  export default {
    name: 'Fullscreen',
    data() {
      const fullscreen = useFullscreen(() => this.$refs.div, {
        onFull: () => console.log('full'),
        onExitFull: () => console.log('exit full'),
      })
      return {
        fullscreen,
      }
    },
  }
</script>
```

### useInterval

#### Config

```javascript
const { state, start, stop, restart } = useInterval(callback, (delay = 1000), (immediate = true))
```

#### Demo

```html
<style lang="sass" scoped></style>
<template lang="pug">
.interval
  h2 test interval
  div
    p 短信验证码倒计时
    el-button(@click='msgCountdown.restart', :disabled='msgCountdown.state.activated') {{ msgCountdownValue }}
</template>
<script>
  import { useInterval, useComputed } from '../index.js'
  export default {
    name: 'Interval',
    data() {
      const msgCountdown = useInterval(
        () => {
          if (msgCountdown.state.counter >= 5) msgCountdown.stop()
        },
        1000,
        false,
      )
      useComputed('msgCountdownValue', () =>
        msgCountdown.state.activated ? 5 - msgCountdown.state.counter : '点击发送',
      )

      return { msgCountdown }
    },
  }
</script>
```

### useTimeout

#### Config

```javascript
const { start, stop } = useTimeout(callback, (delay = 1000), (immediate = true))
```

#### Demo

```html
<template lang="pug">
.timeout
  h2 test timeout
  el-button-group
    el-button(@click='timeout.stop') 停止
    el-button(@click='timeout.start') 开始
</template>
<script>
  import { useTimeout } from '../index.js'
  export default {
    name: 'Timeout',
    data() {
      const timeout = useTimeout(() => {
        console.log('test timeout')
      })
      return {
        timeout,
      }
    },
  }
</script>
```

### useTitle

#### Config

```javascript
const state = useTitle((title = document.title), (restoreOnUnmount = false))
```

#### Demo

```html
<template lang="pug">
.title
  h2 test title
  div 页面加载时候改标题为 “你好”
  div 2s 后改标题为 “世界”
  a(href='#/move') 离开此页面，标题还原为默认标题
</template>
<script>
  import { useTitle, useTimeout } from '../index.js'
  export default {
    name: 'Timeout',
    data() {
      const title = useTitle('你好', true)
      useTimeout(() => {
        title.value = '世界'
      }, 2000)
      return {
        title,
      }
    },
  }
</script>
```

### useCountdown

#### Config

```javascript
// state = {
//   targetDate
//   countdown
//   formatted: {
//     days
//     hours
//     minutes
//     seconds
//     milliseconds
//   },
// )
const state = useCountdown(targetDate, (interval = 1000))
```

### Demo

```html
<template lang="pug">
.interval
  h2 test countdown
  p There are {{ countdown.formatted.days }} days {{ countdown.formatted.hours }} hours {{ countdown.formatted.minutes }} minutes {{ countdown.formatted.seconds }} seconds {{ countdown.formatted.milliseconds }} milliseconds until {{ countdown.targetDate }}

  div
    | 验证码
    el-button(@click="() => msgCountdown.targetDate = Date.now() + 5000", :disabled="msgCountdown.countdown !== 0")| {{msgCountdownValue}}

</template>
<script>
  import { useCountdown, useTimeout, useComputed } from '../index.js'
  export default {
    name: 'Countdown',
    data() {
      const countdown = useCountdown()
      useTimeout(() => {
        countdown.targetDate = '2021-12-31 24:00:00'
      }, 1000)

      const msgCountdown = useCountdown()
      useComputed('msgCountdownValue', () =>
        msgCountdown.countdown ? Math.round(msgCountdown.countdown / 1000) + 's' : '发送验证码',
      )
      return { countdown, msgCountdown }
    },
  }
</script>
```

### useWheel

### Demo

```html
<template lang="pug">
.title
  h2 test wheel
  .wheel(:style='{ transform: "scale(" + zoomState.value + ")" }')
</template>
<script>
  import { useWheel } from '../index.js'
  export default {
    name: 'Wheel',
    data() {
      const zoomState = {
        value: 1,
      }
      const zoom = (type = '+') => {
        if (type === '+') {
          zoomState.value *= 1 + 0.015
        } else {
          zoomState.value /= 1 + 0.015
          zoomState.value = Math.max(0.1, zoomState.value)
        }
      }
      const wheel = useWheel(delta => {
        if (delta > 0) {
          zoom('+')
        } else {
          zoom('-')
        }
      })
      wheel.start()
      return {
        zoomState,
      }
    },
  }
</script>
```
