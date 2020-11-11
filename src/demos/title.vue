<style lang="sass" scoped></style>
<template lang="pug">
.title
  h2 test title
  div 页面加载时候改标题为 “你好”
  div 2s 后改标题为 “世界”
  a(href='#/move') 离开此页面，标题还原为默认标题
</template>
<script>
import { useTitle, useTimeout } from '../index.js'
export default {
  name: 'Timeout',
  data() {
    const title = useTitle('你好', true)
    useTimeout(() => {
      title.value = '世界'
    }, 2000)
    return {
      title,
    }
  },
}
</script>
