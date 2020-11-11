<style lang="sass" scoped></style>
<template lang="pug">
.interval
  h2 test interval
  p 定时器运算次数 {{ interval.state.counter }}，定时器运行状态 {{ interval.state.activated }}
  el-button-group
    el-button(@click='interval.stop') 停止
    el-button(@click='interval.start') 开始

  p 
    | 短信验证码倒计时
    el-button(@click='msgCountdown.restart', :disabled='msgCountdown.state.activated') {{ msgCountdownValue }}
</template>
<script>
import { useInterval, useComputed } from '../index.js'
export default {
  name: 'Interval',
  data() {
    const interval = useInterval(() => {
      console.log('test interval')
    }, 1000)

    const msgCountdown = useInterval(
      () => {
        if (msgCountdown.state.counter >= 5) msgCountdown.stop()
      },
      1000,
      false,
    )
    useComputed('msgCountdownValue', () =>
      msgCountdown.state.activated ? 5 - msgCountdown.state.counter : '点击发送',
    )

    return { interval, msgCountdown }
  },
}
</script>
