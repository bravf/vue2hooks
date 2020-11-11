<style lang="sass" scoped></style>
<template lang="pug">
.interval
  h2 test countdown
  p There are {{ countdown.formatted.days }} days {{ countdown.formatted.hours }} hours {{ countdown.formatted.minutes }} minutes {{ countdown.formatted.seconds }} seconds {{ countdown.formatted.milliseconds }} milliseconds until {{ countdown.targetDate }}

  div 
    | 验证码
    el-button(@click="() => msgCountdown.targetDate = Date.now() + 5000", :disabled="msgCountdown.countdown !== 0")| {{msgCountdownValue}}

</template>
<script>
import { useCountdown, useTimeout, useComputed } from '../index.js'
export default {
  name: 'Countdown',
  data() {
    const countdown = useCountdown()
    useTimeout(() => {
      countdown.targetDate = '2021-12-31 24:00:00'
    }, 1000)

    const msgCountdown = useCountdown()
    useComputed('msgCountdownValue', () =>
      msgCountdown.countdown ? Math.round(msgCountdown.countdown / 1000) + 's' : '发送验证码',
    )
    return { countdown, msgCountdown }
  },
}
</script>
