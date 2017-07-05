import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 配置路由
var routes = [

  // 重定向
  {path:'*',redirect:'/home'}
]
// 传递路由实例
export default new Router({
  routes: routes,
  scrollBehavior:() => ({
    y:0
  })
})
