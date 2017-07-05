// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import '../node_modules/element-ui/lib/theme-default/index.css'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
Vue.use(VueRouter)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
