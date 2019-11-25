const chalk = require('chalk')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const { getProjectName } = require('./modules/validator')

module.exports = async projectName => {
  projectName = await getProjectName(projectName)

  const folder = path.join(process.cwd(), 'src/projects/' + projectName)
  fs.stat(folder, (err, stats) => {
    if (err) {
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
