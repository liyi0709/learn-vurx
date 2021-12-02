import Vue from 'vue'
import Vuex from 'vuex'

// 导入定义的常量方法
// import { INCREMENT, DECREMENT, INCREMENTCOUNT } from './mutations-types'
import * as types from './mutations-types'

// import { DECREMENT } from './mutations-types'
// 1.安装插件
Vue.use(Vuex)

// 2.创建对象

// 写一个modules的对象
const moduleA = {
  state: {
    name: 'cherry'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '11'
    },
    fullname2(state, getters) {
      return getters.fullname + '222'
    },
    // 在这里想拼接store实例->state中的counter
    // 可以用rootState来获取到store(根）实例中的值
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
  actions: {
    // context这里不是$store对象，而是指到自己
    aUpdateName(context) {
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  },

}




const store = new Vuex.Store({
  state: {
    // 变量
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
  },
  mutations: {
    // 方法
    // 事件类型（state,payload(可有可无)）{回调函数}
    updateInfo(state) {
      // 修改info中本有的name 可以发生变化
      state.info.name = 'lyric'

      // 给info增加新属性  页面不会发生变化
      // state.info['address'] = '洛杉矶'  

      // 只要写的话也会把属性加入到响应式中，页面也会发生改变
      // Vue.set(state.info, 'address', '洛杉矶')

      // 删掉某个对象的属性  用delete的话删除页面不会更新
      // delete state.info.age
      // 这样写页面才会更新
      // Vue.delete(state.info, 'age')

    },
    // 错误代码！！！！mutations中不能进行异步操作！
    // updateInfo(state) {
    //   setTimeout(() => {
    //     state.info.name = 'lyric'
    //   },1000)
    // }
    //将方法名定义为常量使用[常量方法名] 
    [types.INCREMENT](state) {
      state.counter++
    },
    // [INCREMENT](state) {
    //   state.counter++
    // },
    // 普通写法
    // increment(state) {
    //   state.counter++
    // },
    // decrement(state) {
    //   state.counter--
    // },
    [types.DECREMENT](state) {
      state.counter--
    },
    [types.INCREMENTCOUNT](state, count) {
      state.counter += count
    },
    // incrementCount(state, count) {
    //   state.counter += count
    // },
    // 相当于：
    // incrementCount(state, payload) {
    //   state.counter += payload.count
    // },

    addStu(state, stu) {
      state.students.push(stu)
    }
  },
  actions: {  //异步操作
    // 默认参数context：上下文 相当于$store对象
    // 此处commit的updateInfo在mutations中
    // aUpdateInfo(context) {
    //   setTimeout(() => {
    //     // 这里的updateInfo用的是mutations中的updateInfo，所以修改的是name的值
    //     context.commit('updateInfo')
    //   }, 1000)
    // },
    // 传递参数
    // aUpdateInfo(context) {
    //   setTimeout(() => {
    //     context.commit('updateInfo')
    //   }, 1000)
    // },
    // 想要传递其他参数 方法一
    // aUpdateInfo(context, payload) {
    //   setTimeout(() => {
    //     context.commit('updateInfo')
    //     console.log(payload.message);//取到payload对象中的message的值
    //     payload.success()
    //   }, 1000)
    // },
    // 传递其他参数的优雅方法  方法二
    aUpdateInfo(context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload);
          resolve('1111111') //这里会执行promise的then 
        }, 1000)
      })

    },
  },
  getters: {
    // 复杂计算
    powerCounter(state) {
      return state.counter * state.counter
    },
    // 获取年龄大于20岁的学生
    more20stu(state) {
      return state.students.filter(s => s.age > 20)
    },
    // 还想获取年龄大于20岁学生的个数 定义成一个getters
    more20stuLength(state, getters) {
      return getters.more20stu.length
    },
    // 获取年龄大于age的 age是不定值的
    moreAgestu(state) {
      // return function (age) {
      //   return state.students.filter(s => s.age > age)
      // }
      return age => {
        return state.students.filter(s => s.age > age)
      }
    }
  },
  modules: {
    // modules中的内容在state中
    // 与上面创建的moduleA对应
    a: moduleA
  }
})

// 3.导出
export default store
