<template>
  <div id="app">
    <p>-----modules：取到moduleA的state中的name------</p>
    <h2>{{ $store.state.a.name }}</h2>
    <button @click="updateName">修改名字</button>
    <h2>{{ $store.getters.fullname }}</h2>
    <h2>{{ $store.getters.fullname2 }}</h2>
    <h2>{{ $store.getters.fullname3 }}</h2>
    <button @click="asyncUpdateName">异步修改名字</button>

    <p>-----app内容：info对象的内容是否是 响应规则------</p>
    <h2>{{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>

    <p>----------app中--------</p>
    <h2>{{ message }}</h2>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStu">添加学生</button>

    <p>------app内容：没用getters的复杂方法-----</p>
    <!-- 在获取counter的时候要输出counter的平方 但是他不容易复用，不方便 -->
    <h2>{{ $store.state.counter * $store.state.counter }}</h2>
    <p>-----用store--index.js中的getters----</p>

    <h2>{{ $store.getters.powerCounter }}</h2>

    <!-- 获取年龄大于20岁的学生 -->
    <!-- <h2>{{ more20stu }}</h2> 计算属性-->

    <!-- 使用getters写复杂计算 -->
    <p>------用getters写大于20岁的学生-------</p>
    <h2>{{ $store.getters.more20stu }}</h2>
    <p>-----用getters写大于20岁的学生的长度</p>
    <h2>{{ $store.getters.more20stuLength }}</h2>
    <p>--年龄大于age岁的学生---</p>
    <!-- age是不定的 -->
    <h2>{{ $store.getters.moreAgestu(16) }}</h2>

    <p>-----------hellovuex中------</p>
    <hello-vuex />
    <!-- <hello-vuex :counter="counter"  /> 父子组件传值的方式 -->
  </div>
</template>

<script>
// 引入hellovuex的组件
// 这种导入方法只有导出时写的是export default的时候才能使用
import HelloVuex from "./components/HelloVuex.vue";
import LifeWeek from "./components/LifeWeek.vue";

// 方法常量导入要写的是{}
import { INCREMENT, DECREMENT, INCREMENTCOUNT } from "./store/mutations-types";
// import { DECREMENT } from "./store/mutations-types";

export default {
  name: "App",
  components: {
    HelloVuex,
    LifeWeek,
  },
  data() {
    return {
      message: "我是app组件",
      // counter: 0,
    };
  },
  methods: {
    //moduleA中
    // 用mutations修改modules中的state值 使用普通模式即可
    updateName() {
      this.$store.commit("updateName", "cuic");
    },
    // 异步修改名字 moduleA中
    asyncUpdateName() {
      this.$store.dispatch("aUpdateName");
    },

    // store实例中
    // updateInfo() {
    //   this.$store.commit("updateInfo");
    // },
    updateInfo() {
      // actions中的定时器修改state内容用dispatch
      // this.$store.dispatch("aUpdateInfo");
      // this.$store.dispatch("aUpdateInfo", "我是actions传递的参数payload");
      // 如果要同时传递其他参数法一：将payload写成一个对象
      // this.$store.dispatch("aUpdateInfo", {
      //   message: "我是传递来的参数",
      //   success: () => {
      //     console.log("里面的传递成功");
      //   },
      // });
      // 传递其他参数法2
      // this.$store.dispatch("aUpdateInfo", "我是传递来的参数")相当于store->index.js中的new Promise((resolve, reject) => {setTimeout(() => {context.commit('updateInfo')console.log(payload);resolve('1111111')}, 1000)}) //这里会执行promise的then
      this.$store.dispatch("aUpdateInfo", "我是传递来的参数").then((res) => {
        console.log("里面完成了提交");
        console.log(res);
      });
    },

    add() {
      // 要通过commit提交，所以要写commit('方法名')
      // this.$store.commit("increment");
      // 方法名定义为常量使用
      this.$store.commit(INCREMENT);
    },
    sub() {
      // this.$store.commit("decrement");
      this.$store.commit(DECREMENT);
    },
    addCount(count) {
      // 一个参数
      // 1.普通的提交风格
      // this.$store.commit("incrementCount", count);
      this.$store.commit(INCREMENTCOUNT, count);

      // 2.特殊的提交风格
      // this.$store.commit({
      //   type:'incrementCount', //事件类型
      //   count:count //如果写count  会打印一个对象

      // })
    },
    addStu() {
      const stu = { id: 114, name: "lilei", age: 29 };
      this.$store.commit("addStu", stu);
    },
  },
  // computed: {
  //   // 显示大于20岁的学生
  //   more20stu() {
  //     return this.$store.state.students.filter((s) => s.age > 20);
  //   },
  // },
};
</script>

<style>
</style>
