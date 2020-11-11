<template lang="pug">
.instance 
  h2 test instance
  el-button(@click="state.num ++") 测试 update {{state.num}}
  a(href="/#/request") 测试 destory

</template>
<script>
import {
  useCreated,
  useBeforeMount,
  useMounted,
  useBeforeUpdate,
  useUpdated,
  useBeforeDestroy,
  useDestroyed,
  useComputed,
  useWatch,
} from '../index.js'
export default {
  name: 'Instane',
  data() {
    const state = {
      num: 1,
    }
    useCreated(() => {
      console.log('created')
    })
    useBeforeMount(() => {
      console.log('beforeMount')
    })
    useMounted(() => {
      console.log('mounted')
    })
    useBeforeUpdate(() => {
      console.log('beforeUpdate')
    })
    useUpdated(() => {
      console.log('updated')
    })
    useBeforeDestroy(() => {
      console.log('beforeDestory')
    })
    useDestroyed(() => {
      console.log('destroyed')
    })
    useComputed('hello', () => state.num + 1)
    useWatch('state.num', val => console.log(`state.num = ${val};hello = ${this.hello}`))
    return {
      state,
    }
  },
}
</script>
