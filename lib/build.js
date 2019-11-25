const chalk = require('chalk')
const { getProjectName } = require('./modules/validator')
const { getServe } = require('./modules/server')

module.exports = async (projectName, envMode) => {
  projectName = await getProjectName(projectName, true)
  // 打包项目默认取prod环境
  envMode = envMode || 'prod'
  const build = getServe('build', projectName, envMode)

  build.stdout.on('data', data => {
    console.log(chalk.green(`${data}`))
  })
  build.stderr.on('data', data => {
    console.log(`${data}`)
  })

  build.on('exit', code => {
    if (code === 200) {
      console.log(chalk.green('打包完成'))
    }
    process.exit()
  })
}
