export default {
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
    return age => {
      return state.students.filter(s => s.age > age)
    }
  }
}