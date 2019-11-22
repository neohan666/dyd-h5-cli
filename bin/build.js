const inquirer = require('inquirer'),
  chalk = require('chalk'),
  spawn = require('child_process').spawn

module.exports = async option => {
  if (!option) {
    //如果没输过目录,就弹提示让他输入
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要打包的项目名',
          default: 'activity'
        }
      ])
      .then(answers => {
        option = answers.folder
      })
  }
  let build = spawn(`node`, ['build/exbuild.js', option])

  build.stdout.on('data', data => {
    console.log(`${data}`)
  })

  build.stderr.on('data', data => {
    console.log(`${data}`)
  })

  build.on('exit', code => {
    if (code === 200) console.log(chalk.green('打包完毕，欢迎下次使用'))
    process.exit()
  })
}
