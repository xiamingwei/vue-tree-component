import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/'
import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import '@/styles/index.less'
import animated from 'animate.css' // npm install animate.css --save安装，再引入
import service from '@/service'


Vue.use(iView)
Vue.use(animated)

Vue.prototype.service = service
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
