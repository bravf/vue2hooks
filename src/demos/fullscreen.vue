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
