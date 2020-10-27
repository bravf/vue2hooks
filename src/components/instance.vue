<template lang="pug">
.instance 
  h2 test instance
  el-button(@click="state.num ++") 测试 update {{state.num}}
  a(href="/#/request") 测试 destory

</template>
<script>
import * as hooks from '../index.js'
export default {
  name: 'Instane',
  data() {
    hooks.useCreated(() => {
      console.log('created')
    })
    hooks.useBeforeMount(() => {
      console.log('beforeMount')
    })
    hooks.useMounted(() => {
      console.log('mounted')
    })
    hooks.useBeforeUpdate(() => {
      console.log('beforeUpdate')
    })
    hooks.useUpdated(() => {
      console.log('updated')
    })
    hooks.useBeforeDestroy(() => {
      console.log('beforeDestory')
    })
    hooks.useDestroyed(() => {
      console.log('destroyed')
    })

    return {
      state: {
        num: 1,
      },
    }
  },
}
</script>
