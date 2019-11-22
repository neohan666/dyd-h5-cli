/**
 * 子项目单独配置
 */
// 定义服务器路径
let path = ''
// 获取env环境模式
const mode = process.env.VUE_APP_MODE

switch (mode) {
  case 'dev':
    path = ''
    break
  case 'test':
    path = ''
    break
  case 'beta':
    path = ''
    break
  case 'prod':
    path = ''
    break
  default:
    path = ''
}

export default {
  path
}
