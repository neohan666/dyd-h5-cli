const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const spawn = require('child_process').spawn

module.exports = async option => {
  if (!option) {
    // 如果没输过目录,就弹提示让他输入
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要运行的项目名',
          default: 'activity'
        }
      ])
      .then(answers => {
        option = answers.folder
      })
  }
  const serve = spawn('node', ['build/worker.js', option], { encoding: 'utf-8' })
  const spinner = ora('building project').start()
  serve.stderr.on('data', data => {
    console.log(data.toString())
  })
  serve.stdout.on('data', data => {
    spinner.stop()
    console.log(chalk.green(data.toString()))
  })
}
