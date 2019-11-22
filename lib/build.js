const inquirer = require('inquirer')
const chalk = require('chalk')
const { spawn } = require('child_process')

module.exports = async option => {
  if (!option) {
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要打包的子项目名',
          default: 'activity'
        }
      ])
      .then(answers => {
        option = answers.folder
      })
  }
  const projectName = option.split(':')[0]
  const envMode = option.split(':')[1] || 'prod'

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
    if (code === 200) console.log(chalk.green('打包完毕，欢迎下次使用'))
    process.exit()
  })
}
