import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Top from './Top'
import sidebar from './sidebar'
Vue.use(VueResource)
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
  routes: [
    { path: '',
      components: {
        app: App,
        header: Top,
        side: sidebar
      },
      children: [
        {
          path: '/:id',
          component: App
        }
      ]
    }
  ]
})
new Vue({
  router
}).$mount('.blog')
