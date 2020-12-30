//计算服务器消耗时长的中间件
module.exports = async (ctx,next)=>{
  const start = Date.now();
  //让内层中间件得到执行
  await next();
  const end = Date.now();
  const duration = end - start;
  //设置响应头
  ctx.set('X-Response-Time',duration + 'ms')
}