/*
 *@description: 用户（登录、注册、找回密码）&&管理员的（登录、找回密码）
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:23:49
 *@version: V1.0.5
*/
import * as Login from '../Service/register.js'
/*
 *@functionName: userLogin
 *@params1: req
 *@params2: res
 *@description:  用户的注册
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:26:36
 *@version: V1.0.5
*/
async function userLogin(req,res){
  const {username,password,email}=req.body
  res.json(await Login.userLogin(username,password,email))
}
/*
 *@functionName: userSign
 *@params1: req
 *@params2: res
 *@description:  用户的登录
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:26:36
 *@version: V1.0.5
*/
async function userSign(req,res){
  const {username,password}=req.body
  res.json(await Login.userSign(username,password))
}
/*
 *@functionName: findPassword
 *@params1: req
 *@params2: res
 *@description: 通过邮箱重置密码
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:40:36
 *@version: V1.0.5
*/
async function findPassword(req,res){
  const {username}=req.auth
  const {email}=req.body
  await Login.findPassword(email)
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
async function resetPassword(req,res){
  const {username,password}=req.body
  await Login.resetPassword(username,password)
  //重置密码
}

export {userLogin,userSign,findPassword}