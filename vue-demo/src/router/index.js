import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pie from '../views/Echarts-pie.vue'
import Line from '../views/Echarts-line.vue'
import Funnel from '../views/Echarts-funnel.vue'
// import FlowTestDemo from '../views/Echarts-FlowTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pie',
    name: 'Pie',
    component: Pie,
  },
  {
    path: '/line',
    name: 'Line',
    component: Line,
  },
  {
    path: '/funnel',
    name: 'Funnel',
    component: Funnel,
  },
  {
    path: '/flowtest',
    name: 'FlowAnimate',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Echarts-FlowAnimate.vue'
      ),
    // component: FlowTestDemo,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
