export default {
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