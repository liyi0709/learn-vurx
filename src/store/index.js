import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'
// import * as types from './mutations-types'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象

//重构

const state = {
  counter: 1000,
  students: [
    {
      id: 110, name: 'zmsi', age: 14
    },
    {
      id: 110, name: 'zhangsan', age: 18
    },
    {
      id: 111, name: 'lisi', age: 20
    },
    {
      id: 112, name: 'wangwu', age: 23
    },
  ],
  // 都被加入到vue响应式系统，所以通过Dep ->[Watcher]监听，只要有变化就会响应发生变化
  info: {
    name: 'kobe',
    age: 40,
    height: 1.98
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions, //异步操作
  getters,  //复杂计算
  modules: {
    // modules中的内容在state中
    // 与上面创建的moduleA对应
    a: moduleA
  }
})

// 3.导出
export default store
