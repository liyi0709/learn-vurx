export default {
  aUpdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updateInfo')
        console.log(payload);
        resolve('1111111') //这里会执行promise的then 
      }, 1000)
    })

  },
}