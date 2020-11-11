<style lang="sass" scoped>
.size-div
  border: 1px solid red
  box-sizing: border-box
  margin: 10px
</style>
<template lang="pug">
.size
  h2 size test

  .size-div(v-for="element in elements", :ref="'div' + element.index")
    h2 {{element.index}} : {{ element.size }}
    img(src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')
  
  el-button()| 测试
</template>
<script>
import { useSize } from '../index.js'
export default {
  name: 'Size',
  data() {
    const elements = []
    const getSize = useSize({
      onSizeChange: state => {
        console.log(state)
      },
    })
    setTimeout(() => {
      Array(5)
        .fill('')
        .forEach((val, i) => {
          const item = {
            index: i,
            size: getSize(() => this.$refs['div' + i][0]),
          }
          elements.push(item)
        })
    }, 1000)

    return {
      elements,
    }
  },
}
</script>
