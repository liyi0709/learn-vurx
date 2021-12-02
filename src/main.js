import Vue from 'vue'
import App from './App'
// 1.导入store
import store from './store'


Vue.config.productionTip = false

// Vue.prototype.$store = store 导入store相当于给vue的原型对象增加了方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 2.挂载store到vue实例中
  store,
  render: h => h(App)
})
