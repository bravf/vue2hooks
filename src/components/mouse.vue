<template lang="pug">
.mouse
  h2 mouse test
  div Mouse Pos: {{ mouseState }}
  div Finger Mouse Pos: {{ fingerMouseState }}
</template>
<script>
import { useMouse, useFingerMouse } from '../index.js'
export default {
  name: 'Mouse',
  data() {
    return {
      mouseState: useMouse(),
      fingerMouseState: useFingerMouse(),
    }
  },
}
</script>
