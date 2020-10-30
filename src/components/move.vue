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
    v-for="element in elements"
    @mousedown='element.move',
    :style='{ left: element.pos.x + "px", top: element.pos.y + "px" }'
  ) move me
</template>
<script>
import { useMove, useContext } from '../index.js'
export default {
  name: 'Move',
  data() {
    const elements = []
    setTimeout(() => {
      useContext(this)
      Array(10)
        .fill('')
        .forEach((val, i) => {
          const pos = {
            x: i * 100,
            y: i * 100,
          }
          const item = {
            index: i,
            pos,
            move: useMove(pos, {
              onMove: () => {
                pos.x = Math.max(0, pos.x)
                pos.y = Math.max(0, pos.y)
                console.log('move')
              },
              onMoveEnd: () => {
                console.log('move end')
              },
            }),
          }
          elements.push(item)
        })
    }, 2000)

    return {
      elements,
    }
  },
}
</script>
