# vue2hooks

## 安装:

```
npm install --save vue2hooks
```

## 使用:

```javascript
import {
  useRequest,
  useQuickState,
  useSwitch,
  usePageSearch,
  useRouteQueryChange,
  useEventOn,
  useEventOnce,
  useEventOff,
  useEventEmit,
} from 'vue2hooks'
```

## API

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
const getList = testPromise([])

export default {
  data () {
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

```javascript
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
    // 当前组件实例，当组件销毁时候，清除轮训计时器
    vm: null,
  }
)
</script>
```

### useQuickState

#### Demo:

```javascript
<template>
<form>
  <form-item label="name">
    <input v-model="writeQState.state.name"/>
  </form-item>
  <form-item label="gender">
    <input v-model="writeQState.state.gender"/>
  </form-item>
  <button @click="writeState.reset">Reset</button>
</form>
</template>
<script>
export default {
  data () {
    const writeQState = useQuickState({
      name: '',
      gender: '',
    })
    return {
      writeQState,
    }
  }
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

```javascript
<template>
<Dialog v-model="detailSwitch.state.value"></Dialog>
</template>
<script>
export default {
  data () {
    const detailSwitch = useSwitch()
    return {
      detailSwitch,
    }
  }
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

```javascript
<script>
// 监听 route 参数变化
export default {
  data () {
    useRouteQueryChange({vm: this, callback: () => {}})
  }
}
</script>
```

#### Config:

```javascript
useRouteQueryChange({
  // 当前组件
  vm: this,
  // 是否在组件初始化时候立即执行一次，时机为 created
  immediate: true,
  // 要执行的函数
  callback: () => {},
})
```

### usePageSearch

#### Demo:

```javascript
// 在搜索列表页，我们经常需要把搜索参数挂到 url 上，并能从 url 上同步参数到搜索参数
<template>
<form>
  <form-item label="name">
    <input v-model="searchQState.state.name"/>
  </form-item>
  <form-item label="gender">
    <input v-model="searchQState.state.gender"/>
  </form-item>
  <button @click="pageSearch.reset">Reset</button>
  <button @click="pageSearch.search">Search</button>
</form>
</template>
<script>
export default {
  data () {
    const searchQState = useQuickState({
      name: '',
      gender: '',
    })
    cosnt pageSearch = usePageSearch({
      vm: this,
      quickState: searchQState,
      onSearch: () => {
        // listReq.run()
      },
    })
    return {
      searchQState,
      pageSearch,
    }
  }
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
  // 当前组件，用来获取 router
  vm: null,
})
```

### useEventOn

### useEventOnce

### useEventOff

### useEventEmit

#### Demo:

```javascript
// 上面 4 个方法是封装了一个全局 eventBus 后衍生的方法，基本同 eventBus，唯一不同的是 useEventOn，需要额外传入当前组件，目的是为了当组件销毁时候解绑
useEventOn('dataChange', () => {}, this)
useEventEmit('dataChange', [])
useEventOff('dataChange')
```
