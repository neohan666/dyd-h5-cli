const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaMount = require('koa-mount')
const cp = require('child_process')
const path = require('path')
const chalk = require('chalk')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const fs = require('fs')

// 校验输入
function validatePath (projectName) {
  const folderPath = path.join(process.cwd(), 'dist/' + projectName)
  const isExists = fs.existsSync(folderPath)
  if (!isExists) {
    console.log(chalk.red(`找不到目录，请检查dist文件夹下是否存在${projectName}目录`))
    process.exit()
  }
}

// 服务器启动控制
function serverOnHandler (app, port, projectName) {
  app.listen(port, () => {
    console.log(chalk.green(`服务器启动成功，浏览器访问：http://localhost:${port}/${projectName}/`))
    openBrowserHandler(port, projectName)
  }).on('error', err => {
    if (err.code === 'EADDRINUSE') {
      // 端口号被占用，+1递增
      serverOnHandler(app, port + 1, projectName)
    } else {
      console.log(err)
      process.exit()
    }
  })
}

// 自动打开浏览器
function openBrowserHandler (port, projectName) {
  // 定义打开浏览器的启动命令
  let openCmd = ''
  switch (process.platform) {
    case 'wind32': // windows
      openCmd = 'start'
      break
    case 'darwin': // mac
      openCmd = 'open'
      break
    default:
      openCmd = 'start'
  }
  // 打开浏览器
  cp.exec(`${openCmd} http://localhost:${port}/h5/${projectName}/`)
}

module.exports = projectName => {
  validatePath(projectName)

  const htmlPath = path.join(process.cwd(), '/dist/', projectName)
  const port = 9000

  const projectApp = new Koa()
  // 静态资源配置
  projectApp.use(KoaStatic(htmlPath))
  // 支持路由history模式(无效。。。)
  projectApp.use(historyApiFallback({}))

  // 挂载目录
  const app = new Koa()
  app.use(KoaMount(`/h5/${projectName}`, projectApp))

  serverOnHandler(app, port, projectName)
}
