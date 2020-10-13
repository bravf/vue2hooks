import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Request from './components/request'
import HelloWord from './components/HelloWorld'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

const routes = [
  { path: '/request', component: Request },
  { path: '/helloworld', component: HelloWord },
]

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
