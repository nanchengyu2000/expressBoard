import wss from "../ToolClass/websocket.js";
// import WebSocket from 'ws'

/*
 *@functionName: pushMessage
 *@params1: message
 *@description:  用于管理员发送广播消息 
 *@author: zhangxiaoyu
 *@date: 2023-07-30 18:20:37
 *@version: V1.0.5
*/
function pushMessage(message){
  // 向所有连接的客户端发送消息
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
        client.send({from:"系统",msg:message});
    }
  });
}
/*
 *@functionName: sendMessage
 *@params1: message
 *@description:  用于用户端对端的传输数据，数据格式{from:string,msg:string,to:string}
 *@author: zhangxiaoyu
 *@date: 2023-07-31 08:30:30
 *@version: V1.0.5
*/
function sendMessage(message) {
    // 向对应的客户端发送消息
  wss.clients.forEach((client) => {
    if (client==message.to) {
      if (client.readyState === WebSocket.OPEN) {
        client.send({from:message.from,msg:message.msg});
      }
    }
  });
}