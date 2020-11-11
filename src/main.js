import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Request from './demos/request'
import HelloWord from './demos/HelloWorld'
import Instance from './demos/instance'
import Mouse from './demos/mouse'
import Move from './demos/move'
import FingerMove from './demos/finger-move'
import Size from './demos/size'
import Fullscreen from './demos/fullscreen'
import Interval from './demos/interval'
import Timeout from './demos/timeout'
import Title from './demos/title'
import Countdown from './demos/countdown'

Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

const routes = [
  { path: '/request', component: Request },
  { path: '/helloworld', component: HelloWord },
  { path: '/instance', component: Instance },
  { path: '/mouse', component: Mouse },
  { path: '/move', component: Move },
  { path: '/size', component: Size },
  { path: '/fullscreen', component: Fullscreen },
  { path: '/finger-move', component: FingerMove },
  { path: '/interval', component: Interval },
  { path: '/timeout', component: Timeout },
  { path: '/title', component: Title },
  { path: '/countdown', component: Countdown },
]

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
