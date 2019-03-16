import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EditMessage from '@/components/edit/Message'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/edit'
      // name: 'Edit',
      // component: Edit
    },
    {
      path: '/message',
      name: 'EditMessage',
      component: EditMessage
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "message" */ '@/components/panel/modal/Index')
    }
  ]
})
