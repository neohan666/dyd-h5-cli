const inquirer = require('inquirer')
const chalk = require('chalk')
const { spawn } = require('child_process')

module.exports = async (projectName, envMode) => {
  if (!projectName) {
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要打包的子项目名',
          default: +new Date()
        }
      ])
      .then(answers => {
        projectName = answers.folder
      })
  }
  // 打包项目默认取prod环境
  envMode = envMode || 'prod'

  const build = spawn('node', [
    './node_modules/@vue/cli-service/bin/vue-cli-service.js',
    'build',
    `---${projectName}`,
    '--mode',
    envMode
  ])

  build.stdout.on('data', data => {
    console.log(chalk.green(`${data}`))
  })
  build.stderr.on('data', data => {
    console.log(`${data}`)
  })

  build.on('exit', code => {
    if (code === 200) {
      console.log(chalk.green('打包完毕，欢迎下次使用'))
    }
    process.exit()
  })
}
