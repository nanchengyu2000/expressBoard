/*
 *@description: 用户（登录、注册、找回密码）&&管理员的（登录、找回密码）
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:23:49
 *@version: V1.0.5
*/
import {Email,contentType,RandomCode,Status} from '../ToolClass/util.js'
/*
 *@functionName: userLogin
 *@params1: username 用户名
 *@params2: password  用户密码
 *@description:  用户的注册
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:26:36
 *@version: V1.0.5
*/
async function userLogin(username:string,password:string,email:string){
    
}
/*
 *@functionName: userSign
 *@params1: username 用户名
 *@params2: password  用户密码
 *@description:  用户的登录
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:33:29
 *@version: V1.0.5
*/
async function userSign(username:string,password:string){
  
}
/*
 *@functionName: findPassword
 *@params1: username
 *@params2: email
 *@description: 通过邮箱发送重置密码的验证码
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:40:36
 *@version: V1.0.5
*/
async function findPassword(email){
   let code=RandomCode()
   let result=await Email.send(email,code,"重置密码验证码",contentType.TEXT)
   if (result==true) {
      //把code、email、验证码过期时间存到数据库
      return new Status(203,{},"发送验证码成功！")
   }else{
      return new Status(403,result,"发送验证码失败！")
   }
}
/*
 *@functionName: resetPassword
 *@params1: username
 *@params2: password
 *@description:  重置密码
 *@author: zhangxiaoyu
 *@date: 2023-07-30 16:04:26
 *@version: V1.0.5
*/
async function resetPassword(username,password){
    //重置密码
}
export {userLogin,userSign,findPassword,resetPassword}