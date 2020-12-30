//设置响应头的中间件
module.exports = async (ctx, next) => {
  //设置文件格式
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type', contentType);
  //设置跨域
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
  await next()
}