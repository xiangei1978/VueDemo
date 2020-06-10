import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

var vm = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

export const vueInstance = vm
