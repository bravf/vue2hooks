<template lang="pug">
.mouse
  h2 mouse test
  div Mouse Pos: {{ mouse.state }}
  div Finger Mouse Pos: {{ fingerMouse.state }}
</template>
<script>
import { useMouse, useFingerMouse } from '../index.js'
export default {
  name: 'Mouse',
  data() {
    const mouse = useMouse()
    const fingerMouse = useFingerMouse()
    mouse.start()
    fingerMouse.start()
    return {
      mouse,
      fingerMouse,
    }
  },
}
</script>
