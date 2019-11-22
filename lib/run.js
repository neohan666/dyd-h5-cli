const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const { spawn } = require('child_process')

module.exports = async (projectName, envMode) => {
  if (!projectName) {
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要运行的子项目名',
          default: +new Date()
        }
      ])
      .then(answers => {
        projectName = answers.folder
      })
  }
  // 本地运行默认取dev环境
  envMode = envMode || 'dev'

  const serve = spawn('node', [
    './node_modules/@vue/cli-service/bin/vue-cli-service.js',
    'serve',
    `---${projectName}`,
    '--mode',
    envMode
  ])

  const spinner = ora('running serve ...').start()
  serve.stdout.on('data', data => {
    spinner.stop()
    console.log(chalk.green(data.toString()))
  })
  serve.stderr.on('data', data => {
    console.log(data.toString())
  })
}
