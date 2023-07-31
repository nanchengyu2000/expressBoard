/*
 *@description:  主要设计到的就是也一些处理的工具方法[分页器、返回状态码、文件上传、JWT令牌生成,发送Email]
 *@author: zhangxiaoyu
 *@date: 2023-07-30 13:44:55
 *@version: V1.0.5
*/
import jsonwebtoken from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import util from 'util'

enum Authoritys {
  ADMINISTRATOR=1,  //管理员权限
  AVERAGE=2       //普通用户权限
}
enum contentType {
  TEXT=1,
  HTML=2
}
//创建一个分页器
class Paging {
  private total: number
  private pageSize: number  //每页数量
  private totalPages:number  //页数
  /* 
    total：所有数据量
    pageSize:每一页的数据
  */
  constructor(total:number,pageSize:number){
      this.total=total
      this.pageSize=pageSize
      this.totalPages = Math.ceil(total / pageSize);
  }
  getOffset(page:number):number{
    return (page - 1) * this.pageSize;
  } 
  getTotalPages():number{
    return this.totalPages;
  }
}
//返回状态码
class Status{
  status:number
  message:Object
  message_description?:string
  constructor(status:number,message:Object,message_description?:string){
    this.status=status
    this.message=status
    this.message_description=message_description
  }
}
/*
 *@functionName: getToken
 *@params1: username  用户名
 *@params2: Authority  权限
 *@description: 获取相应的权限token
 *@author: zhangxiaoyu
 *@date: 2023-07-30 14:08:48
 *@version: V1.0.5
*/
function getToken(username:string,role:String):any{
  return jsonwebtoken.sign({username:username,role:role},process.env.secretKey,{expiresIn:process.env.expiresIn})
}

class Email {
  static service:string
  static user:string
  static pass:string 
  static async send(to:string,content:string,Subject:string,type:number){
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: Email.user, // 用于发送邮件的邮箱地址
        pass: Email.pass, // 邮箱密码或者授权码
      },
    });
    let mailOptions={}
    if (type==contentType.TEXT) {
        // 邮件的配置信息
      mailOptions = {
        from: Email.user, // 发件人邮箱地址
        to: to, // 收件人邮箱地址（可以是逗号分隔的多个地址）
        subject: Subject, // 邮件主题
        text: content, // 邮件正文
      };
    }else {
      mailOptions = {
        from: Email.user, // 发件人邮箱地址
        to: to, // 收件人邮箱地址（可以是逗号分隔的多个地址）
        subject: Subject, // 邮件主题
        html: content, // 邮件正文
      };
    }
    const sendMailAsync = util.promisify(transporter.sendMail).bind(transporter);
    try {
      const info = await sendMailAsync(mailOptions);
      return true
    } catch (error) {
      return error
    }
  }
}
/*
 *@functionName: RandomCode
 *@description: 生成六位数的随机数
 *@author: zhangxiaoyu
 *@date: 2023-07-30 15:52:56
 *@version: V1.0.5
*/
function RandomCode(){
  let code=""
  for (let i = 0; i < 6; i++) {
    code+=Math.floor(Math.random()*10)
  }
  return code
}

export {Paging,Status,Authoritys,getToken,Email,contentType,RandomCode}