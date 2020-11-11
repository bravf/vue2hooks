<style lang="sass" scoped>
.move-div
  position: absolute
  width: 200px
  height: 200px
  border: 1px solid red
</style>
<template lang="pug">
.move
  h2 finger move test
  .move-div(
    v-for='element in elements',
    @touchstart='(e) => move(e, element.pos)',
    :style='{ left: element.pos.x + "px", top: element.pos.y + "px" }'
  ) move me
</template>
<script>
import { useFingerMove } from '../index.js'
export default {
  name: 'Move',
  data() {
    const elements = []
    const move = useFingerMove({
      onMove: (pos) => {
        pos.x = Math.max(0, pos.x)
        pos.y = Math.max(0, pos.y)
        console.log('on move', pos)
      },
      onMoveEnd: (pos) => console.log('on move end', pos),
    })

    setTimeout(() => {
      Array(2)
        .fill('')
        .forEach((val, i) => {
          const pos = {
            x: i * 100,
            y: i * 100,
          }
          const item = {
            index: i,
            pos,
          }
          elements.push(item)
        })
    }, 1000)

    return {
      elements,
      move,
    }
  },
}
</script>
