import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edit from './views/Edit'
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
      // path: '/edit/message/:id',
      path: '/edit/message',
      name: 'EditMessage',
      component: EditMessage
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "message" */ '@/components/panel/modal/Index')
    }
    // {
    //   path: 'edit',
    //   component: 'Edit',
    //   children: [
    //     {
    //       path: 'message',
    //       name: 'EditMessage',
    //       component: EditMessage
    //       // route level code-splitting
    //       // this generates a separate chunk (about.[hash].js) for this route
    //       // which is lazy-loaded when the route is visited.
    //       // component: () => import(/* webpackChunkName: "message" */ '@/components/panel/modal/Index')
    //     }
    //   ]
    // }
  ]
})
