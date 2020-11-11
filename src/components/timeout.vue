<style lang="sass" scoped></style>
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
