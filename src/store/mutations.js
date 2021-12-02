// 重构store->index.js中的mutations，一般建议新建一个js文件来存放
// 导入定义的常量方法
import * as types from './mutations-types'

export default {
  updateInfo(state) {
    state.info.name = 'lyric'
  },
  [types.INCREMENT](state) {
    state.counter++
  },
  [types.DECREMENT](state) {
    state.counter--
  },
  [types.INCREMENTCOUNT](state, count) {
    state.counter += count
  },
  addStu(state, stu) {
    state.students.push(stu)
  }
}
