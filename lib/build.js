const chalk = require('chalk')
const { getProjectName } = require('./modules/validator')
const { getServe } = require('./modules/spawnApp')

module.exports = async (projectName, envMode, callback) => {
  const isBuildAll = !!callback && typeof callback === 'function'

  projectName = await getProjectName(projectName, true)
  // 打包项目默认取prod环境
  envMode = envMode || 'prod'
  const build = getServe('build', projectName, envMode)

  build.stdout.on('data', data => {
    if (isBuildAll) {
      return
    }
    console.log(chalk.green(`${data}`))
  })
  build.stderr.on('data', data => {
    console.log(`${data}`)
  })

  build.on('exit', code => {
    if (code === 0) {
      console.log(chalk.green('-----' + projectName + '打包完成'))
      console.log(chalk.green(''))
    }
    if (isBuildAll) {
      callback(code)
    } else {
      process.exit()
    }
  })
}
