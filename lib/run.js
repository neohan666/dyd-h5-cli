const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const { spawn } = require('child_process')

module.exports = async option => {
  if (!option) {
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要运行的子项目名',
          default: 'activity'
        }
      ])
      .then(answers => {
        option = answers.folder
      })
  }
  const projectName = option.split(':')[0]
  const envMode = option.split(':')[1] || 'dev'

  const serve = spawn('node', [
    './node_modules/@vue/cli-service/bin/vue-cli-service.js',
    'serve',
    `---${projectName}`,
    '--mode',
    envMode
  ])

  const spinner = ora('running project ...').start()
  serve.stdout.on('data', data => {
    spinner.stop()
    console.log(chalk.green(data.toString()))
  })
  serve.stderr.on('data', data => {
    console.log(data.toString())
  })
}
