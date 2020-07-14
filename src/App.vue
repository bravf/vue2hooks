<template>
  <div id="app">
    <div>
      <my-app/>
      <!-- <h3>测试 useRequest</h3>
      <div v-if="getDetailRequest.state.loading">loading...</div>
      <div v-if="getDetailRequest.state.error">{{ getDetailRequest.state.error }}</div>
      <div v-if="getDetailRequest.state.data">{{ getDetailRequest.state.data }}</div>
      <button @click="getDetailRequest.run()">查询</button>
      <button @click="getDetailRequest.cancel()">cancel</button>
      <button @click="getDetailRequest.reset()">reset</button> -->
      
      <!-- <h3>并发测试</h3>
      <div class="item" v-for="i in list" :key="i">
        <div v-if="getDetailRequest.getState(i).loading">获取detail {{i}} 数据中...</div>
        <div v-if="getDetailRequest.getState(i).data">{{ getDetailRequest.getState(i).data }}</div>
        <button @click="() => {getDetailRequest.run(i)}">获取数据 {{ i }}</button>
      </div> -->

      <h3>debounce 测试</h3>
      <input type="text" @input="getDebounceDataRequest.runDebounce"/>
    </div>
  </div>
</template>

<script>
import { useRequest } from './index'
const getData = () => {
  console.log('getData')
  return new Promise(resolve => {
    setTimeout(() => {
      const data = "name" + + new Date
      resolve(data)
    }, 1000)
  })
}
// 简单测试
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

export default {
  name: "App",
  components: {
    myApp
  },
  data() {
    return {
      list: ["a", "b", "c"],
      getDetailRequest: useRequest(this.getDetail, {
        fetchKey: id => id
      }),
      getDebounceDataRequest: useRequest(getData, {
        manual: true,
        debounceWait: 500,
      })
    }
  },
  methods: {
    getDetail(id) {
      id = id || "hehe"
      console.log("getdetail:", id)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("detail: " + id)
        }, 2000)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  display: flex;
}
</style>
