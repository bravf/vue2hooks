<template lang="pug">
.mouse
  h2 mouse test
  div Mouse Pos: {{mouseState}}
</template>
<script>
import { useMouse } from '../index.js'
export default {
  name: 'Mouse',
  data() {
    return {
      mouseState: useMouse(),
    }
  },
}
</script>
