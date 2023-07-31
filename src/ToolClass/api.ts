/*
 *@description:  重要用于请求第三方接口的封装
 *@author: zhangxiaoyu
 *@date: 2023-07-30 13:45:48
 *@version: V1.0.5
*/
import { config } from 'dotenv';
config()
import axios from 'axios'

//全局参数，自定义参数可在发送请求时设置
axios.defaults.timeout = 300000000 //超时时间ms
axios.defaults.withCredentials = false
// 请求时的拦截
//回调里面不能获取错误信息
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 当请求异常时做一些处理
    console.log('请求异常：' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  console.log('响应出错：' + error)
  return Promise.reject(error)
})
/* 
  因为三方求较多，在这就不封装baseUrl和Authorization
*/
// const Chatapi=axios.create({
//   baseURL:process.env.CHATGPTURL,
//   headers:{
//     Authorization: 'Bearer ' + process.env.OPEN_AI_KEY,
//   }
// })

// export {Chatapi}