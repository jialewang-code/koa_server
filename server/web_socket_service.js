const WebSocket = require('ws');
const path = require('path')
const fileUtils = require('../utils/file_utils');

//创建WebSocket服务端对象
const wss = new WebSocket.Server({
  port: 9998
});
//服务器开启了监听
module.exports.listen = () => {
  //对客户端的连接事件进行监听
  //client 代表的是客户端的连接 socket 对象
  wss.on('connection', client => {
    console.log('客户端连接成功了。。。');
    //对客户端的连接对象进行 message 事件监听
    //msg 由客户端发送给服务端的数据
    client.on('message', async msg => {
      console.log('客户端发送数据给服务端了：' + msg);
      let payload = JSON.parse(msg);
      const action = payload.action;
      if (action === 'getData') {
        // payload.chartName //trend seller hot map rank stock
        let filePath = '../data/' + payload.chartName + '.json';
        filePath = path.join(__dirname, filePath);
        const ret = await fileUtils.getFileJsonData(filePath);
        //需要在服务端获取的数据基础之上，增加一个 data 字段
        //data 所对应的数据就是某个 json 文件的内容
        payload.data = ret;
        client.send(JSON.stringify(payload));
      } else {
        //原封不支的将所接收到的数据转发给每一个处于连接状态的客户端
        //wss.clients  所有客户端的连接
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      //由服务端往客户端发送数据
      // client.send('hello socket from backend')
    })
  })
}
