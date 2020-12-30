//服务器的入口文件
const Koa = require('koa')
const resDurationMiddleware = require('./middleware/koa_response_duration')
const resHeaderMiddleware = require('./middleware/koa_response_header')
const resDataMiddleware = require('./middleware/koa_response_data')


const app = new Koa()

//绑定中间件
//绑定第一层
app.use(resDurationMiddleware)

//绑定第二层
app.use(resHeaderMiddleware)

//绑定第三层
app.use(resDataMiddleware)

app.listen(8989, function () {
  console.log('server is running...');
})

const webSocketService = require('./server/web_socket_service');
//开启服务端的监听，监听客户端的连接
//当某一个客户端连接成功之后，就会对这个客户端进行 message 事件的监听
webSocketService.listen()
