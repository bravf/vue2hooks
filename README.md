# vue2hooks

### useRequest

#### 安装: npm install --save vue2hooks

Demo:
```javascript
const getData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = "name" + + new Date
      resolve(data)
    }, 1000)
  })
}
const getDataRequest = useRequest(getData)
const myApp = {
  render() {
    const { data, error, loading } = getDataRequest.state

    if (error) {
      return <div>failed to load</div>
    }
    if (loading) {
      return <div>loading...</div>
    }
    return <div>Username: {data}</div>
  }
}
```

### useSwitch
Demo:
```html
<template>
  <div v-if="popupSwitch.state.value">
    我是弹层
  </div>
  <button @click="popupSwitch.on">打开弹层</button>
  <button @click="popupSwitch.off">打开弹层</button>
</template>
<script>
export default {
  data () {
    return {
      popupSwitch: useSwitch(),
    }
  }
}
</script>
```