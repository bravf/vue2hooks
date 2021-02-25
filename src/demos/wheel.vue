<style lang="scss">
html,
body {
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.wheel {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  position: relative;
}
</style>
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
    const wheel = useWheel((delta) => {
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
