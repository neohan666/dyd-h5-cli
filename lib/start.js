const chalk = require('chalk')
const ora = require('ora')
const { getProjectName } = require('./modules/validator')
const { getServe } = require('./modules/server')

module.exports = async (projectName, envMode) => {
  projectName = await getProjectName(projectName, true)
  // 本地运行默认取dev环境
  envMode = envMode || 'dev'
  const serve = getServe('serve', projectName, envMode)

  const spinner = ora('starting serve ...').start()
  serve.stdout.on('data', data => {
    spinner.stop()
    console.log(chalk.green(data.toString()))
  })
  serve.stderr.on('data', data => {
    console.log(data.toString())
  })
}
