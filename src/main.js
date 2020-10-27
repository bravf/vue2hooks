import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Request from './components/request'
import HelloWord from './components/HelloWorld'
import Instance from './components/instance'
import Mouse from './components/mouse'
import Move from './components/move'

Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

const routes = [
  { path: '/request', component: Request },
  { path: '/helloworld', component: HelloWord },
  { path: '/instance', component: Instance },
  { path: '/mouse', component: Mouse },
  { path: '/move', component: Move },
]

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
