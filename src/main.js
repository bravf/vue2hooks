import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Request from './components/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
const routes = [{ path: '/request', component: Request }]
const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
