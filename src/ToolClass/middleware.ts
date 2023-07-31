/*
 *@description: 所有中间件
 *@author: zhangxiaoyu
 *@date: 2023-07-30 16:31:43
 *@version: V1.0.5
*/
import jwt from 'jsonwebtoken'
import {Status} from './util.js'
import {Authoritys} from './util.js'
import { config } from 'dotenv';
config()
/*
 *@functionName: verifyToken
 *@params1: req
 *@params2: res
 *@params2: next
 *@description:  普通用户使用这个函数来进行验证【公共接口不需要使用验证的中间件】
 *@author: zhangxiaoyu
 *@date: 2023-07-30 16:40:31
 *@version: V1.0.5
*/
function verifyToken(req, res, next) {
  const token = req.headers.authorization; // 获取请求头中的 Authorization 字段

  if (!token) {
    return res.json(new Status(401,"未提供 Token"));
  }
  jwt.verify(token,process.env.secretKey,(err, decoded) => {
    if (err) {
      return res.json(new Status(401,"Token 验证失败"));
    }
    req.user = decoded; // 将解码后的用户信息保存在请求对象中，方便后续路由使用
    next();
  })
}
/*
 *@functionName: verifyRole
 *@params1: req
 *@params2: res
 *@params2: next
 *@description:  管理员接口的第二个中间件
 *@author: zhangxiaoyu
 *@date: 2023-07-30 16:42:37
 *@version: V1.0.5
*/
function verifyRole(req, res, next) {
    // 进行权限控制
    if (req.user.role !== Authoritys.ADMINISTRATOR) {
      return res.json(new Status(403,"没有权限访问该接口"));
    }
    next();
}

export {verifyToken,verifyRole}