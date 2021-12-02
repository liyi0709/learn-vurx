<template>
  <div>
    <h2>{{ $store.state.counter }}</h2>
    <!-- getters属性进行counter的平方计算 -->
    <h2>{{ $store.getters.powerCounter }}</h2>
    <!-- 在store中写的大于20岁的学生在这个页面使用 -->
    <h2>{{ $store.getters.more20stu }}</h2>
    <!-- info -->
    <h2>{{ $store.state.info }}</h2>
  </div>
</template>

<script>
// 这个页面也想使用vue中的counter变量
// 该页面和APP.vue实际上是一个父子组件
// 如果不是父子组件，就要使用vuex
export default {
  name: "HelloVuex",
  // props: {
  //   counter: Number,
  // },
};
</script>

<style>
</style>