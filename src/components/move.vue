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
  .move-div(
    @mousedown='move',
    :style='{ left: pos.x + "px", top: pos.y + "px" }'
  ) move me
</template>
<script>
import { useMove } from '../index.js'
export default {
  name: 'Move',
  data() {
    const pos = { x: 100, y: 100 }
    const move = useMove(pos, () => {
      pos.x = Math.max(0, pos.x)
      pos.y = Math.max(0, pos.y)
    })
    return {
      pos,
      move,
    }
  },
}
</script>
