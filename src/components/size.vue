<style lang="sass" scoped>
.size-div
  border: 1px solid red
</style>
<template lang="pug">
.size
  h2 size test
  div 元素大小 {{ size }}
  .size-div(ref='div')
    img(src='https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png')
</template>
<script>
import { useSize, useWatch } from '../index.js'
export default {
  name: 'Size',
  data() {
    useWatch(
      'size',
      () => {
        console.log('size change')
      },
      { deep: true },
    )

    return {
      size: useSize('div'),
    }
  },
}
</script>
