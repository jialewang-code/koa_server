//处理业务逻辑的中间件，读取某个 json 文件的数据
const path = require('path');
const fileUtils=require('../utils/file_utils')

module.exports = async (ctx, next) => {
  //获取路径
  const url = ctx.request.url;// /api/seller ../data/seller.json
  let filePath = url.replace('/api', '');// /seller
  //拼接路径
  filePath = '../data' + filePath + '.json';// ../data/seller.json
  //拼接绝对路径
  filePath = path.join(__dirname, filePath);
  try {
      const ret =await fileUtils.getFileJsonData(filePath);
      ctx.response.body = ret;
  } catch (error) {
    const errorMsg = {
      msg: '读取文件失败，文件资源不存在',
      status:404,      
    }
    ctx.response.body = JSON.stringify(errorMsg);
  }

  console.log(filePath);
  await next()
}