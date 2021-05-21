import axios from "axios";
// export function request(config,success,failure) {
//   //1.创建axios的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//
//   //发送真正的网络请求
//   instance(config)
//     .then(res => {
//       // console.log(res)
//       success(res)
//     })
//     .catch(err => {
//       // console.log(err)
//       failure(err)
//     })
// }

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1.创建axios的实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     //发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1拦截器的作用
  axios.interceptors.request.use(config => {
    console.log(config)
    //1.比如config中一些信息不符合服务器的要求
    //2.比如每次发送网络请求的时候在界面中显示一个请求的图标
    //3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
    return config
  },err => {
    console.log(err)
  })

  //2.2响应拦截
  axios.interceptors.response.use(res => {
    console.log(res)
    return res.data
  },err => {
    console.log(err)
  })



  //3.发送真正的网络请求
  return instance(config)
}

// export function instance2() {
//
// }
