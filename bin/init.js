const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

module.exports = async option => {
  if (!option) {
    // 如果没输入过目录,就弹提示让他输入
    const defaultName = 'n' + new Date().getTime()
    await inquirer
      .prompt([
        {
          type: 'Input',
          name: 'folder',
          message: '请输入你要创建的子项目名',
          default: defaultName
        }
      ])
      .then(answers => {
        option = answers.folder
      })
  }
  const folder = path.join(process.cwd(), 'src/projects/' + option)
  fs.stat(folder, (err, stats) => {
    if (err) {
      // 没有目录
      fse.copy(path.join(__dirname, '../src/template'), folder, err => {
        if (err) {
          console.log(chalk.red(err))
        } else {
          console.log(chalk.green('子项目创建成功'))
        }
        process.exit()
      })
    } else {
      console.log(chalk.red('子项目已存在'))
      process.exit()
    }
  })
}
