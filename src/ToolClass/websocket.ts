/*
 *@description: 开启一个websocket服务，并且进行推送消息【包括管理员(系统)推送的消息、用户之间的通信】
 *@author: zhangxiaoyu
 *@date: 2023-07-30 18:07:12
 *@version: V1.0.5
*/
import { config } from 'dotenv';
config(); // 加载环境变量

import WebSocket from 'ws'

const wss=new WebSocket.Server({ port: process.env.WebSocketPort || 8086 });

const clients = new Map();  //全部的用户

const clientgroup=new Map()   //特定的用户组

// WebSocket 连接建立时的处理逻辑
wss.on('connection', (ws,req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const username = url.searchParams.get('username');
  if (!username) {
    ws.close();
    return;
  }

  clients.set(username, ws);

    // 客户端断开连接时的处理逻辑
    ws.on('close', () => {
      clients.forEach((client) => {
        if (client.ws==ws) {
          clients.delete(client);
        }
    });
      
    });

    ws.on('message', (message) => {
      clients.forEach((client) => {
          if (client.username==message.to) {
              client.send({from:message.from,msg:message.msg})
          }
      });
    });
});




export default wss
